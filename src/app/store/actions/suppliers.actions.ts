import { createAction, props } from '@ngrx/store';
import { CreateSupplierDto, Supplier } from '../../models/supplier';

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

export const loadSupplier = createAction(
  '[Supplier] Load Supplier',
  props<{ id: number }>()
);

export const loadSupplierSuccess = createAction(
  '[Supplier] Load Supplier Success',
  props<{ supplier: CreateSupplierDto }>()
);

export const loadSupplierFailure = createAction(
  '[Supplier] Load Supplier Failure',
  props<{ error: any }>()
);

export const saveSupplier = createAction(
  '[Supplier] Save Supplier',
  props<{ id?: number; supplier: CreateSupplierDto }>()
);

export const saveSupplierSuccess = createAction(
  '[Supplier] Save Supplier Success'
);

export const saveSupplierFailure = createAction(
  '[Supplier] Save Supplier Failure',
  props<{ error: any }>()
);

export const deleteSupplier = createAction(
  '[Supplier] Delete Supplier',
  props<{ id: number }>()
);

export const deleteSupplierSuccess = createAction(
  '[Supplier] Delete Supplier Success',
  props<{ id: number }>()
);

export const deleteSupplierFailure = createAction(
  '[Supplier] Delete Supplier Failure',
  props<{ error: any }>()
);
