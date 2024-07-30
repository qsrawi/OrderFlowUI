import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerBaseDto } from '../../models/customer';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class CustomerFormComponent implements OnInit {
  @Input() customer: CustomerBaseDto | null = null;
  @Output() submitForm = new EventEmitter<CustomerBaseDto>();

  customerForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.customerForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      identity: ['', Validators.required],
      details: [''],
      address: ['', Validators.required],
      image: [''],
      balance: ['', Validators.required],
      supplierId: [1, Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.submitForm.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }
}
