import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSupplierDto } from '../../models/supplier';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectSupplierById } from '../../store/selectors/suppliers.selectors';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SupplierFormComponent {
  @Input() supplier: CreateSupplierDto | null = null;
  @Input() isUpdateMode: boolean = false;
  @Input() supplierId: number | null = null;
  @Output() submitForm = new EventEmitter<CreateSupplierDto>();

  supplierForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.supplierForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      identity: ['', Validators.required],
      details: [''],
      address: ['', Validators.required],
      supplierBalance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.supplier) {
      this.supplierForm.patchValue(this.supplier);
    }
    if (this.isUpdateMode && this.supplierId) {
      this.loadCustomerDetails(this.supplierId);
    }
  }

  loadCustomerDetails(id: number): void {
    this.store.select(selectSupplierById(id)).subscribe(customer => {
      if (customer) {
        this.supplierForm.patchValue({
          userName: customer.userName,
          password: customer.password,
          email: customer.email,
          phone: customer.phone,
          name: customer.name,
          identity: customer.identity,
          details: customer.details,
          address: customer.address,
          supplierBalance: customer.supplierBalance
        });
      }
    });
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.submitForm.emit(this.supplierForm.value);
    } else {
      this.supplierForm.markAllAsTouched();
    }
  }
}
