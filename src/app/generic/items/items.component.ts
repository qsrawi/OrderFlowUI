import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ItemsActions from '../../store/actions/items.actions';
import { selectAllItems, selectTotalCount, selectError } from '../../store/selectors/items.selectors';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { map, take } from 'rxjs/operators';
import { NumberRangePipe } from '../../helpers/number-range.pipe';
import { Item, ItemFilterParams } from '../../models/item';
import { selectisAllItems, selectUserId, selectUserRole } from '../../store/selectors/auth.selectors';
import { selectItemImage } from '../../store/selectors/image.selectors';
import { addItemToCart } from '../../store/actions/cart.actions';
import { selectSupplierId } from '../../store/selectors/cart.selectors';
import { Router } from '@angular/router';

declare var bootstrap: any;

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
  isAllItems$: Observable<boolean>;
  currentSupplierId$: Observable<number>;

  filters: ItemFilterParams = {
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
  selectedImage: string | null = null;
  showModal: boolean = false;
  isAllItems: boolean = false;

  constructor(private store: Store, private router: Router) {
    this.items$ = this.store.select(selectAllItems);
    this.totalCount$ = this.store.select(selectTotalCount);
    this.error$ = this.store.select(selectError);
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
    this.isAllItems$ = this.store.select(selectisAllItems);
    this.currentSupplierId$ = this.store.select(selectSupplierId);
  }

  ngOnInit(): void {
    this.userRole$.subscribe(role => this.userRole = role);
    this.isAllItems$.subscribe(isAllItems => this.isAllItems = isAllItems);
    this.loadItems();
  }

  loadItems(): void {
    if (this.userRole === 'Supplier') {
      if(!this.isAllItems)
        this.loadItemsBySupplier();
      else
        this.loadItemsForSupplier();
    } else if (this.userRole === 'Customer'){
      this.loadItemsByCustomer();
    } else 
      this.store.dispatch(ItemsActions.loadItems({ filters: this.filters }));
  }

  loadItemsBySupplier(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.store.dispatch(ItemsActions.loadItemsBySupplier({ supplierId: this.supplierId,  filters: this.filters }));
  }

  loadItemsForSupplier(): void {
    this.userId$.subscribe(id => this.supplierId = id);
    this.filters = { ...this.filters, supplierId: this.supplierId };
    this.store.dispatch(ItemsActions.loadItemsForSupplier({ filters: this.filters }));
  }

  loadItemsByCustomer(): void {
    this.userId$.subscribe(id => this.customerId = id);
    this.store.dispatch(ItemsActions.loadItemsForCustomer({ customerId: this.customerId,  filters: this.filters }));
  }

  viewImage(itemId: number): void {
    this.store.dispatch(ItemsActions.loadItemImage({ itemId }));
    this.store
      .select(state => selectItemImage(state, { itemId }))
      .subscribe(image => {
        if (image) {
          this.selectedImage = image;
          this.showModal = true;
        }
      });
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedImage = null;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = URL.createObjectURL(file);
      this.showModal = true;
    }
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

  editItem(itemId: number): void {
    this.router.navigate(['supplier/update-Item', itemId]);
  }

  deleteItem(itemId: number): void {
    this.store.dispatch(ItemsActions.deleteItem({ id: itemId }));
  }

  addToCart(itemId: number, itemName: string, itemPrice: number, supplierId: number) {
    const quantityStr = window.prompt('Enter the quantity you want to add to the cart:', '1');
    const quantity = Number(quantityStr);

    if (isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity.');
      return;
    }

    this.currentSupplierId$.pipe(take(1)).subscribe(currentSupplierId => {
      if (currentSupplierId !== 0 && currentSupplierId !== supplierId) {
        alert('Please complete your purchase for one supplier before adding items from another supplier.');
        return;
      }

      this.store.dispatch(addItemToCart({ itemId, quantity, itemName, price: itemPrice, supplierId }));
    });
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