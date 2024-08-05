import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as ChequesActions from '../../store/actions/cheques.actions';
import { selectAllCheques, selectTotalCount, selectLoading, selectError } from '../../store/selectors/cheques.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Cheque, ChequeFilterParams } from '../../models/cheques';
import { selectTransactions } from '../../store/selectors/transactions.selectors';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';
import { Transaction } from '../../models/cheque_transaction';
import { selectItemImage } from '../../store/selectors/image.selectors';

@Component({
  selector: 'app-cheques',
  templateUrl: './cheques.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class ChequesComponent implements OnInit {
  cheques$: Observable<Cheque[]>;
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  transactions$: Observable<Transaction[]>;
  userRole$: Observable<string| undefined>;
  userId$: Observable<number| undefined>;
  selectedChequeIds: Set<number> = new Set();

  filters: ChequeFilterParams = {
    Status: '',
    IssueDateFrom: undefined,
    IssueDateTo: undefined,
    DueDateFrom: undefined,
    DueDateTo: undefined,
    AmountFrom: undefined,
    AmountTo: undefined,
    IsIncoming: false,
    Currency: '',
    BankName: '',
    PageNumber: 1,
    PageSize: 10
  };

  selectedTab: string = 'Outgoing';
  showModal: boolean = false;
  isSupplier: boolean = false;
  supplierId: number | undefined;
  userRole: string | undefined;
  pageSize: number = 10;
  selectedImage: string | null = null;
  showImgModal: boolean = false;

  constructor(private store: Store) {
    this.cheques$ = this.store.select(selectAllCheques);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.transactions$ = this.store.select(selectTransactions);
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.loadCheques();
    this.store.dispatch(ChequesActions.clearChequesToEndorsement());
  }

  loadCheques(): void {
      this.isSupplier = this.userRole === 'Supplier';
      if (this.isSupplier) {
        this.loadChequesBySupplier();
      } else 
        this.store.dispatch(ChequesActions.loadCheques({ chequeType: this.selectedTab, filters: this.filters }));

  }

  loadChequesBySupplier(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.store.dispatch(ChequesActions.loadChequesBySupplier({ supplierId: this.supplierId, filters: this.filters }));
  }

  applyFilters(): void {
    this.filters = { ...this.filters, PageNumber: 1 };
    this.loadCheques();
  }

  viewImage(chequeId: number, isFront: boolean): void {
    if (chequeId) {
      const role = this.userRole === 'Supplier' ? 'Supplier' : 'Admin';
      this.store.dispatch(
        ChequesActions.loadImage({ chequeId, role, isFront })
      );
    }
  
    this.store.select(state => selectItemImage(state, { itemId: chequeId, isFront })).subscribe(image => {
      debugger
      if (image) {
        this.selectedImage = image;
        this.showImgModal = true;
      }
    });
  }

  closeImgModal(): void {
    this.showImgModal = false;
    this.selectedImage = null;
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, PageNumber: page };
    this.loadCheques();
  }

  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
    this.loadCheques();
  }

  onTabChange(tab: string): void {
    if(this.userRole == "Supplier"){
      const isIncoming = tab === "Outgoing"? false : true;
      this.filters = { ...this.filters,  IsIncoming: isIncoming, PageNumber: 1 };
    } else{
      this.filters = { ...this.filters,  PageNumber: 1 };
    }
    this.selectedTab = tab;
    this.loadCheques();
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.filters.PageSize))
    );
  }

  updateFilter(field: string, value: any): void {
    if (['IssueDateFrom', 'IssueDateTo', 'DueDateFrom', 'DueDateTo'].includes(field) && value) {
      value = new Date(value);
    } else if (value === '') {
      value = undefined;
    }
    this.filters = { ...this.filters, [field]: value };
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const day = `0${d.getDate()}`.slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  toggleChequeSelection(customerId: number): void {
    if (this.selectedChequeIds.has(customerId)) {
      this.selectedChequeIds.delete(customerId);
    } else {
      this.selectedChequeIds.add(customerId);
    }
    this.store.dispatch(ChequesActions.updateChequesToEndorsement({ chequeIds: Array.from(this.selectedChequeIds) }));
  }

  viewTransactions(chequeId: number): void {
    if(this.isSupplier = this.userRole === 'Supplier')
      this.store.dispatch(ChequesActions.loadChequeTransactionsForSupplier({ chequeId }));
    else
      this.store.dispatch(ChequesActions.loadChequeTransactions({ chequeId }));
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
