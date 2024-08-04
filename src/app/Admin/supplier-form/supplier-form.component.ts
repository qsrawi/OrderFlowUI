import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateSupplierDto } from '../../models/supplier';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SupplierFormComponent {
  @Input() supplier: CreateSupplierDto | null = null;
  @Output() submitForm = new EventEmitter<CreateSupplierDto>();

  supplierForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.supplierForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      name: ['', Validators.required],
      identity: ['', Validators.required],
      details: [''],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.supplier) {
      this.supplierForm.patchValue(this.supplier);
    }
  }

  onSubmit(): void {
    if (this.supplierForm.valid) {
      this.submitForm.emit(this.supplierForm.value);
    } else {
      this.supplierForm.markAllAsTouched();
    }
  }
}
