import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import * as SupplierActions from '../../store/actions/suppliers.actions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';
import { CreateSupplierDto } from '../../models/supplier';
import { SuppliersService } from '../../services/suppliers.service';

@Component({
  selector: 'app-update-supplier',
  template: `
  <div *ngIf="loading$ | async; else loaded">
    Loading...
  </div>
  <ng-template #loaded>
    <app-supplier-form [supplierId]="supplierId" [isUpdateMode]="true" [supplier]="supplier$ | async" (submitForm)="onSubmit($event)"></app-supplier-form>
  </ng-template>
`,
  standalone: true,
  imports: [SupplierFormComponent, CommonModule, FormsModule]
})
export class UpdateSupplierComponent implements OnInit {
  supplier$: Observable<CreateSupplierDto | null> = of(null);
  loading$: Observable<boolean> = of(false);
  supplierId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private supplierService: SuppliersService
  ) {}

  ngOnInit(): void {
    const supplierIdParam = this.route.snapshot.paramMap.get('id');
    if(supplierIdParam)
      this.supplierId = Number(supplierIdParam);
    if(this.supplierId)
      this.supplier$ = this.supplierService.loadSupplier(this.supplierId);
  }

  onSubmit(supplier: CreateSupplierDto): void {
    if(this.supplierId)
      this.supplierService.saveSupplierWithDispatch(this.supplierId, supplier);
  }
}
