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
    <app-supplier-form [supplier]="supplier$ | async" (submitForm)="onSubmit($event)"></app-supplier-form>
  </ng-template>
`,
  styleUrls: ['./update-supplier.component.css'],
  standalone: true,
  imports: [SupplierFormComponent, CommonModule, FormsModule]
})
export class UpdateSupplierComponent implements OnInit {
  supplier$: Observable<CreateSupplierDto | null> = of(null);
  loading$: Observable<boolean> = of(false);

  constructor(
    private route: ActivatedRoute,
    private supplierService: SuppliersService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.supplierService.getLoading().pipe(take(1));
    this.supplier$ = this.route.paramMap.pipe(
      switchMap(params => {
        const supplierId = Number(params.get('id'));
        return this.supplierService.loadSupplier(supplierId);
      })
    );
  }

  onSubmit(supplier: CreateSupplierDto): void {
    this.route.paramMap.pipe(
      map(params => {
        const supplierId = Number(params.get('id'));
        this.supplierService.saveSupplierWithDispatch(supplierId, supplier);
      })
    ).subscribe();
  }
}
