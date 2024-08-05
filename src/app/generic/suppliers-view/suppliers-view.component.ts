import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Supplier } from '../../models/supplier';
import { SuppliersService } from '../../services/suppliers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';
import { selectchequesToEndorsement } from '../../store/selectors/cheques.selectors';
import * as ChequesActions from '../../store/actions/cheques.actions';
import * as SupplierActions from '../../store/actions/suppliers.actions';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';
import { Transaction } from '../../models/cheque_transaction';
import { selectTransactions } from '../../store/selectors/transactions.selectors';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { fontTajawalMedium } from '../../models/pdf';
import * as AuthActions from '../../store/actions/auth.actions';

const tajawalFontBase64 = fontTajawalMedium; 

pdfFonts.pdfMake.vfs['TajawalMedium.ttf'] = tajawalFontBase64;

pdfMake.fonts = {
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  },
  Tajawal: {
    normal: 'TajawalMedium.ttf',
    bold: 'TajawalMedium.ttf',
    italics: 'TajawalMedium.ttf',
    bolditalics: 'TajawalMedium.ttf'
  }
};

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  styleUrl: './suppliers-view.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe],
  animations: [
    trigger('flyInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class SuppliersViewComponent implements OnInit {
  suppliers$: Observable<Supplier[]>;
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userRole$: Observable<string| undefined>;
  userId$: Observable<number| undefined>;
  chequesToEndorsement$: Observable<number[]>;
  transactions$: Observable<Transaction[]>;

  filters: any = {
    name: '',
    userName: '',
    email: '',
    phone: '',
    address: '',
    identity: ''
  };

  pageNumber: number = 1;
  pageSize: number = 10;
  userRole: string | undefined;
  userId: number | undefined;
  showModal: boolean = false;
  transactions: Transaction[] = []; 

  constructor(private suppliersService: SuppliersService, private router: Router, private store: Store, private toastr: ToastrService) {
    this.suppliers$ = this.suppliersService.getSuppliers();
    this.totalCount$ = this.suppliersService.getTotalCount();
    this.loading$ = this.suppliersService.getLoading();
    this.error$ = this.suppliersService.getError();
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    this.chequesToEndorsement$ = this.store.select(selectchequesToEndorsement).pipe(take(1));
    this.transactions$ = this.store.select(selectTransactions);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.userId$.subscribe(userId => this.userId = userId);
    this.transactions$.subscribe(transactions => {
      this.transactions = transactions;
    });
    this.loadSuppliers();
  }
  
  loadSuppliers(): void {
    if (this.userRole === 'Supplier') {
      this.suppliersService.loadSuppliers(this.pageNumber, this.pageSize, this.filters, this.userId);
    } else
    this.suppliersService.loadSuppliers(this.pageNumber, this.pageSize, this.filters, undefined);
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.loadSuppliers();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadSuppliers();
  }

  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
    this.loadSuppliers();
  }

  updateFilter(field: string, value: string): void {
    this.filters = { ...this.filters, [field]: value };
  }

  editSupplier(supplierId: number): void {
    this.router.navigate(['admin/update-supplier', supplierId]);
  }

  deleteSupplier(supplierId: number): void {
    this.suppliersService.deleteSupplier(supplierId)
  }

  createEndorsementCheque(supplierId: number): void {
    this.chequesToEndorsement$.subscribe(chequesToEndorsement => {
      if (chequesToEndorsement.length === 0) {
        alert('You have to go to the cheques field to select cheques for endorsement.');
        return;
      }
    
      this.store.dispatch(ChequesActions.endorsementCheque({ chequesIds: chequesToEndorsement, supplierId }));
      this.store.dispatch(ChequesActions.clearChequesToEndorsement());
    });
  }

  accountStatement(supplierId: number): void {
    this.store.dispatch(SupplierActions.loadTransactions({ supplierId: this.userId, tradingSupplierId: supplierId}));
    this.showModal = true;
  }

  generatePDF(): void {
    const content = [
      {
        text: ' الحساب  بيان',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      }
    ];

    this.transactions.forEach((transaction, index) => {
      content.push(
        { text: `Transaction ${index + 1}`, style: 'subheader', alignment: 'right', margin: [0, 0, 0, 5] },
        { text: `Transaction ID: ${transaction.transactionId}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Invoice Number : ${transaction.invoiceNumber}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Transaction Date: ${transaction.transactionDate.toString()}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Amount: ${transaction.amount}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Receiver Name: ${transaction.receiverName}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Issuer Name: ${transaction.issuerName}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Payment Method: ${transaction.paymentMethod}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Currency: ${transaction.currency}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
        { text: `Remaining Debt: ${transaction.remainingDebt}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 10] }
      );
    });

    const documentDefinition: any = {
      content: content,
      defaultStyle: {
        font: 'Tajawal'
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          font: 'Tajawal'
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black',
          font: 'Tajawal'
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }

  getStatusDebtColor(status: string | undefined): string {
    return status == "Debt"? 'red-text' : 'green-text';
  }

  formatRemainingDebt(value: number): number {
    return Math.abs(value);
  }
  
  formatPaymentStatus(value: number, status: string | undefined): string | undefined {
    if(value < 0){
      if (status == "Debt")
        return "Credit"
      else
        return "Debt"
    }
    else
     return status
  }

  addReceipt(supplierId: number): void {
    this.store.dispatch(AuthActions.isRecipt({ isRecipt: true }));
    this.router.navigate(['/supplier/add-receipt']);
    this.store.dispatch(AuthActions.forSupplier({ supplierId }));
  }

  addVoucher(supplierId: number): void {
    this.store.dispatch(AuthActions.isRecipt({ isRecipt: false }));
    this.router.navigate(['/supplier/add-receipt']);
    this.store.dispatch(AuthActions.forSupplier({ supplierId }));
  }

  closeModal(): void {
    this.showModal = false;
    this.store.dispatch(ChequesActions.CleanTransactions())
  }

  viewCustomers(id: number): void {
    this.router.navigate(['/admin/customers-view', id]);
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.pageSize))
    );
  }
}