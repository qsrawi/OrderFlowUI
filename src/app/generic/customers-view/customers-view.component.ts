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
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberRangePipe]
})
export class CustomersViewComponent implements OnInit {
  customers$: Observable<CustomerBaseDto[]>;
  totalCount$: Observable<number>;
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
  supplierId: number | undefined;

  constructor(private customerService: CustomerService, private store: Store) {
    this.customers$ = this.customerService.getCustomers();
    this.totalCount$ = this.customerService.getTotalCount();
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  ngOnInit(): void {
    this.loadCustomers();
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
}