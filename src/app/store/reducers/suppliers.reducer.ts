import { createReducer, on } from '@ngrx/store';
import * as SuppliersActions from '../actions/suppliers.actions';
import { Supplier } from '../../models/supplier';

export interface SuppliersState {
  suppliers: Supplier[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  filters: any;
  loading: boolean;
  error: string | null;
}

export const initialState: SuppliersState = {
  suppliers: [],
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
    loading: true,
    pageNumber,
    pageSize,
    filters
  })),
  on(SuppliersActions.loadSuppliersSuccess, (state, { suppliers, totalCount }) => ({
    ...state,
    loading: false,
    suppliers,
    totalCount
  })),
  on(SuppliersActions.loadSuppliersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
