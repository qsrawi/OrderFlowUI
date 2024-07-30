import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as CustomerActions from '../../store/actions/customer.actions';
import { CustomerBaseDto } from '../../models/customer';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { selectUserId } from '../../store/selectors/auth.selectors';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  template: `<app-customer-form (submitForm)="onSubmit($event)"></app-customer-form>`,
  styleUrls: ['./add-customer.component.css'],
  standalone: true,
  imports: [CustomerFormComponent, CommonModule, FormsModule]
})
export class AddCustomerComponent {
  userId$: Observable<number| undefined>;

  supplierId: number | undefined;
  constructor(private store: Store, private router: Router) {
    this.userId$ = this.store.select(selectUserId).pipe(take(1));
  }

  onSubmit(customer: CustomerBaseDto): void {
    this.userId$.subscribe(id => this.supplierId = id);
    const updatedCustomer: CustomerBaseDto = {
      ...customer,
      supplierId: this.supplierId
    };
    this.store.dispatch(CustomerActions.addCustomer({ customer: updatedCustomer }));
  }
}
