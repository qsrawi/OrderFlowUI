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

@Component({
  selector: 'app-suppliers-view',
  templateUrl: './suppliers-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class SuppliersViewComponent implements OnInit {
  suppliers$: Observable<Supplier[]>;
  totalCount$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  userRole$: Observable<string| undefined>;
  userId$: Observable<number| undefined>;

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

  constructor(private suppliersService: SuppliersService, private router: Router, private store: Store) {
    this.suppliers$ = this.suppliersService.getSuppliers();
    this.totalCount$ = this.suppliersService.getTotalCount();
    this.loading$ = this.suppliersService.getLoading();
    this.error$ = this.suppliersService.getError();
    this.userRole$ = this.store.select(selectUserRole).pipe(take(1));
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }
  
  loadSuppliers(): void {
    this.suppliersService.loadSuppliers(this.pageNumber, this.pageSize, this.filters);
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
    console.log(`Create Endorsement Cheque for supplierId: ${supplierId}`);
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.pageSize))
    );
  }
}