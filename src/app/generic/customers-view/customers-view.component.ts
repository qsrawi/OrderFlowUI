import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Router } from '@angular/router';
import { CustomerBaseDto } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { selectUserId } from '../../store/selectors/auth.selectors';
import * as AuthActions from '../../store/actions/auth.actions';
import * as CustomerActions from '../../store/actions/customer.actions';
import { Store } from '@ngrx/store';
import { Transaction } from '../../models/cheque_transaction';
import { selectTransactions } from '../../store/selectors/transactions.selectors';
import { fontTajawalMedium } from '../../models/pdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

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
  selector: 'app-customers-view',
  styleUrl: './customers-view.component.css',
  templateUrl: './customers-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class CustomersViewComponent implements OnInit {
  customers$: Observable<CustomerBaseDto[]>;
  totalCount$: Observable<number>;
  userId$: Observable<number| undefined>;
  transactions$: Observable<Transaction[]>;

 /* const tajawalFontBase64 = fontTajawalMedium; 

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
};*/

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
  supplierId: number | undefined;
  showModal: boolean = false;
  transactions: Transaction[] = []; 

  constructor(private customerService: CustomerService, private store: Store, private router: Router) {
    this.customers$ = this.customerService.getCustomers();
    this.totalCount$ = this.customerService.getTotalCount();
    this.transactions$ = this.store.select(selectTransactions);
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

  }

  ngOnInit(): void {
    this.loadCustomers();
    this.transactions$.subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  loadCustomers(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.customerService.loadCustomers(this.supplierId, this.pageNumber, this.pageSize, this.filters);
  }

  applyFilters(): void {
    this.pageNumber = 1;
    this.loadCustomers();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.loadCustomers();
  }

  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
    this.loadCustomers();
  }

  updateFilter(field: string, value: string): void {
    this.filters = { ...this.filters, [field]: value };
  }

  getDebtColor(debt: number): string {
    return debt < 0 ? 'green-text' : 'red-text';
  }

  editCustomer(id: number): void {
    //this.router.navigate(['admin/update-supplier', id]);
  }

  deleteCustomer(id: number): void {
    //this.suppliersService.deleteSupplier(id)
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.pageSize))
    );
  }

  addReceipt(customerId: number): void {
    this.router.navigate(['/supplier/add-receipt']);
    this.store.dispatch(AuthActions.forCustomer({ customerId }));
  }


  generatePDF(): void {
    const content = [
      {
        text: 'بيان الحساب',
        style: 'header',
        alignment: 'center',
        margin: [0, 0, 0, 20]
      }
    ];

    this.transactions.forEach((transaction, index) => {
      content.push(
        { text: `Transaction ${index + 1}`, style: 'subheader', alignment: 'right', margin: [0, 0, 0, 5] },
        { text: `Transaction: ${transaction.transactionId}`, style: 'normal', alignment: 'right', margin: [0, 0, 0, 2] },
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

  accountStatement(customerId: number): void {
    this.store.dispatch(CustomerActions.loadTransactions({ customerId }));
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.store.dispatch(CustomerActions.CleanTransactions())
  }
}