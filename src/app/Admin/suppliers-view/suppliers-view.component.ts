import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../../models/supplier';
import { SuppliersService } from '../../services/suppliers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NumberRangePipe } from '../../helpers/number-range.pipe';

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

  constructor(private suppliersService: SuppliersService) {
    this.suppliers$ = this.suppliersService.getSuppliers();
    this.totalCount$ = this.suppliersService.getTotalCount();
    this.loading$ = this.suppliersService.getLoading();
    this.error$ = this.suppliersService.getError();
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

  updateFilter(field: string, value: string): void {
    this.filters = { ...this.filters, [field]: value };
  }

  get totalPages(): Observable<number> {
    return this.totalCount$.pipe(
      map(totalCount => Math.ceil(totalCount / this.pageSize))
    );
  }
}