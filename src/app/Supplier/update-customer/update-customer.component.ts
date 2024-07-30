import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as CustomerActions from '../../store/actions/customers.actions';
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
      <app-customer-form [customer]="customer$ | async" (submitForm)="onSubmit($event)"></app-customer-form>
    </ng-template>
  `,
  styleUrls: ['./update-customer.component.css'],
  standalone: true,
  imports: [CustomerFormComponent, CommonModule, FormsModule]
})
export class UpdateCustomerComponent implements OnInit {
  customer$: Observable<CustomerBaseDto | null> = of(null);
  loading$: Observable<boolean> = of(false);

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customer$ = this.route.paramMap.pipe(
      switchMap(params => {
        const customerId = Number(params.get('id'));
        return this.customerService.loadCustomer(customerId);
      })
    );
  }

  onSubmit(customer: CustomerBaseDto): void {
    this.route.paramMap.pipe(
      map(params => {
        const customerId = Number(params.get('id'));
        this.customerService.saveCustomerWithDispatch(customerId, customer);
      })
    ).subscribe();
  }
}
