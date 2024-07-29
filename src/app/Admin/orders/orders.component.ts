import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as OrdersActions from '../../store/actions/orders.actions';
import { selectAllOrders, selectTotalCount, selectError } from '../../store/selectors/orders.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map} from 'rxjs/operators';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Order, OrderFilterParams } from '../../models/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class OrderComponent implements OnInit {
  orders$: Observable<Order[]>;
  totalCount$: Observable<number>;
  error$: Observable<string | null>;

  filters: OrderFilterParams = {
    OrderDateFrom: undefined,
    OrderDateTo: undefined,
    MinTotalAmount: undefined,
    MaxTotalAmount: undefined,
    Status: '',
    PageNumber: 1,
    PageSize: 10
  };

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.store.dispatch(OrdersActions.loadOrders({ filters: this.filters }));
  }

  applyFilters(): void {
    this.filters = { ...this.filters, PageNumber: 1 };
    this.loadOrders();
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, PageNumber: page };
    this.loadOrders();
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.filters.PageSize))
    );
  }

  updateFilter(field: string, value: any): void {
    if (['OrderDateFrom', 'OrderDateTo'].includes(field) && value) {
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
}
