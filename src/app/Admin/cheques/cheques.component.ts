import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as ChequesActions from '../../store/actions/cheques.actions';
import { selectAllCheques, selectTotalCount, selectLoading, selectError } from '../../store/selectors/cheques.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Cheque, ChequeFilterParams } from '../../models/cheques';

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

  filters: ChequeFilterParams = {
    Status: '',
    IssueDateFrom: undefined,
    IssueDateTo: undefined,
    DueDateFrom: undefined,
    DueDateTo: undefined,
    AmountFrom: undefined,
    AmountTo: undefined,
    Currency: '',
    ChequeHolderName: '',
    BankName: '',
    PageNumber: 1,
    PageSize: 10
  };

  selectedTab: string = 'Outgoing';

  constructor(private store: Store) {
    this.cheques$ = this.store.select(selectAllCheques);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.loadCheques();
  }

  loadCheques(): void {
    this.store.dispatch(ChequesActions.loadCheques({ chequeType: this.selectedTab, filters: this.filters }));
  }

  applyFilters(): void {
    this.filters.PageNumber = 1;
    this.loadCheques();
  }

  onPageChange(page: number): void {
    this.filters.PageNumber = page;
    this.loadCheques();
  }

  onTabChange(tab: string): void {
    this.selectedTab = tab;
    this.filters.PageNumber = 1;
    this.loadCheques();
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.filters.PageSize))
    );
  }

  updateFilter(field: string, value: any): void {
    this.filters = { ...this.filters, [field]: value };
  }
}
