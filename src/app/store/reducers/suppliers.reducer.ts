import { createReducer, on } from '@ngrx/store';
import * as SuppliersActions from '../actions/suppliers.actions';
import { CreateSupplierDto, Supplier } from '../../models/supplier';

export interface SuppliersState {
  suppliers: Supplier[];
  supplier: CreateSupplierDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  filters: any;
  loading: boolean;
  error: string | null;
}

export const initialState: SuppliersState = {
  suppliers: [],
  supplier: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  filters: {},
  loading: false,
  error: null
};

export const suppliersReducer = createReducer(
  initialState,
  on(SuppliersActions.loadSuppliers, (state, { pageNumber, pageSize, filters }) => ({
    ...state,
    pageNumber,
    pageSize,
    filters
  })),
  on(SuppliersActions.loadSuppliersSuccess, (state, { suppliers, totalCount }) => ({
    ...state,
    suppliers,
    totalCount
  })),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(SuppliersActions.loadSupplier, state => ({
    ...state,
    loading: true 
  })),
  on(SuppliersActions.loadSupplierSuccess, (state, { supplier }) => ({
    ...state,
    supplier,
    loading: false,
    error: null
  })),
  on(SuppliersActions.loadSupplierFailure, (state, { error }) => ({
    ...state,
    supplier: null,
    loading: false,
    error
  })),
  on(SuppliersActions.deleteSupplierSuccess, (state, { id }) => ({
    ...state,
    suppliers: state.suppliers.filter(supplier => supplier.supplierId !== id),
    error: null
  })),
  on(SuppliersActions.deleteSupplierFailure, (state, { error }) => ({
    ...state,
    error
  })),
);
