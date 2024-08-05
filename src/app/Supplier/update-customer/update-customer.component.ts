import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as CustomerActions from '../../store/actions/customer.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerBaseDto } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-update-customer',
  template: `
    <div *ngIf="loading$ | async; else loaded">
      Loading...
    </div>
    <ng-template #loaded>
      <app-customer-form [customerId]="customerId" [isUpdateMode]="true" [customer]="customer$ | async" (submitForm)="onSubmit($event)"></app-customer-form>
    </ng-template>
  `,
  standalone: true,
  imports: [CustomerFormComponent, CommonModule, FormsModule]
})
export class UpdateCustomerComponent implements OnInit {
  customer$: Observable<CustomerBaseDto | null> = of(null);
  loading$: Observable<boolean> = of(false);
  customerId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    const customerIdParam = this.route.snapshot.paramMap.get('id');
    if(customerIdParam)
      this.customerId = Number(customerIdParam);
    if(this.customerId)
      this.customer$ = this.customerService.loadCustomer(this.customerId);
  }

  onSubmit(customer: CustomerBaseDto): void {
    if(this.customerId)
      this.customerService.saveCustomerWithDispatch(this.customerId, customer);
  }
}
