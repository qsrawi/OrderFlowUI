import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ItemsActions from '../../store/actions/items.actions';
import { selectAllItems, selectTotalCount, selectError } from '../../store/selectors/items.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, defaultIfEmpty, take } from 'rxjs/operators';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Item, ItemFilterParams } from '../../models/item';
import { selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class ItemsComponent implements OnInit {
  items$: Observable<Item[]>;
  totalCount$: Observable<number>;
  error$: Observable<string | null>;
  userRole$: Observable<string | undefined>;
  userId$: Observable<number| undefined>;

  filters: ItemFilterParams = {
    SupplierName: '',
    ItemName: '',
    MinPrice: undefined,
    MaxPrice: undefined,
    CreatedDateFrom: undefined,
    CreatedDateTo: undefined,
    PageNumber: 1,
    PageSize: 10
  };

  supplierId: number | undefined;
  customerId: number | undefined;
  userRole: string | undefined;
  pageSize: number = 10;

  constructor(private store: Store) {
    this.items$ = this.store.select(selectAllItems);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.error$ = this.store.select(selectError);
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.loadItems();
  }

  loadItems(): void {
    if (this.userRole === 'Supplier') {
      this.loadItemsBySupplier();
    } else if (this.userRole === 'Customer'){
      this.loadItemsByCustomer();
    } else 
      this.store.dispatch(ItemsActions.loadItems({ filters: this.filters }));
  }

  loadItemsBySupplier(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.store.dispatch(ItemsActions.loadItemsBySupplier({ supplierId: this.supplierId,  filters: this.filters }));
  }

  loadItemsByCustomer(): void {
    this.userId$.subscribe(id => this.customerId = id);
    this.store.dispatch(ItemsActions.loadItemsForCustomer({ customerId: this.customerId,  filters: this.filters }));
  }

  applyFilters(): void {
    this.filters = { ...this.filters, PageNumber: 1 };
    this.loadItems();
  }

  onPageChange(page: number): void {
    this.filters = { ...this.filters, PageNumber: page };
    this.loadItems();
  }


  onPageSizeChange(event: Event): void {
    const newSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newSize, 10);
    this.filters = { ...this.filters, PageSize: this.pageSize, PageNumber: 1 };
    this.loadItems();
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.filters.PageSize))
    );
  }

  updateFilter(field: string, value: any): void {
    if (['CreatedDateFrom', 'CreatedDateTo'].includes(field) && value) {
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