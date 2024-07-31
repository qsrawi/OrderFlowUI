import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as OrdersActions from '../../store/actions/orders.actions';
import { selectAllOrders, selectTotalCount, selectError } from '../../store/selectors/orders.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, take} from 'rxjs/operators';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Order, OrderFilterParams } from '../../models/orders';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';

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
  userRole$: Observable<string | undefined>;
  userId$: Observable<number| undefined>;

  filters: OrderFilterParams = {
    OrderDateFrom: undefined,
    OrderDateTo: undefined,
    MinTotalAmount: undefined,
    MaxTotalAmount: undefined,
    Status: '',
    PageNumber: 1,
    PageSize: 10
  };

  supplierId: number | undefined;
  pageSize: number = 10;
  userRole: string | undefined;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.error$ = this.store.select(selectError);
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.userRole === 'Supplier') {
      this.loadOrdersBySupplier();
    } else
      this.store.dispatch(OrdersActions.loadOrders({ filters: this.filters }));
  }

  loadOrdersBySupplier(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.store.dispatch(OrdersActions.loadOrdersBySupplier({ supplierId: this.supplierId, filters: this.filters }));
  }

  applyFilters(): void {
    this.filters = { ...this.filters, PageNumber: 1 };
    this.loadOrders();
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, PageNumber: page };
    this.loadOrders();
  }

  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
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
