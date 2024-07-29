import { createAction, props } from '@ngrx/store';
import { Supplier } from '../../models/supplier';

export const loadSuppliers = createAction(
  '[Suppliers] Load Suppliers',
  props<{ pageNumber: number, pageSize: number, filters: any }>()
);

export const loadSuppliersSuccess = createAction(
  '[Suppliers] Load Suppliers Success',
  props<{ suppliers: Supplier[], totalCount: number }>()
);

export const loadSuppliersFailure = createAction(
  '[Suppliers] Load Suppliers Failure',
  props<{ error: string }>()
);
