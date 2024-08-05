import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as SupplierActions from '../../store/actions/suppliers.actions';
import { CreateSupplierDto } from '../../models/supplier';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  template: `<app-supplier-form [isUpdateMode]="false" (submitForm)="onSubmit($event)"></app-supplier-form>`,
  standalone: true,
  imports: [SupplierFormComponent, CommonModule, FormsModule]
})
export class AddSupplierComponent {
  constructor(private store: Store, private router: Router) {}

  onSubmit(supplier: CreateSupplierDto): void {
    this.store.dispatch(SupplierActions.saveSupplier({ supplier }));
  }
}
