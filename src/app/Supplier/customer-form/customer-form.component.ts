import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerBaseDto } from '../../models/customer';
import { Store } from '@ngrx/store';
import { selectCustomerById } from '../../store/selectors/customer.selectors';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: CustomerBaseDto | null = null;
  @Input() isUpdateMode: boolean = false;
  @Input() customerId: number | null = null;
  @Output() submitForm = new EventEmitter<CustomerBaseDto>();

  customerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.customerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      identity: ['', Validators.required],
      details: [''],
      address: ['', Validators.required],
      balance: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
    if (this.isUpdateMode && this.customerId) {
      this.loadCustomerDetails(this.customerId);
    }
  }

  loadCustomerDetails(id: number): void {
    this.store.select(selectCustomerById(id)).subscribe(customer => {
      if (customer) {
        this.customerForm.patchValue({
          userName: customer.userName,
          password: customer.password,
          email: customer.email,
          phone: customer.phone,
          name: customer.name,
          identity: customer.identity,
          details: customer.details,
          address: customer.address,
          balance: customer.balance
        });
      }
    });
  }
  
  onSubmit(): void {
    if (this.customerForm.valid) {
      this.submitForm.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
