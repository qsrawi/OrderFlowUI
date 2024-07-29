import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SuppliersState } from '../reducers/suppliers.reducer';

export const selectSuppliersState = createFeatureSelector<SuppliersState>('suppliers');

export const selectAllSuppliers = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.suppliers
);

export const selectTotalCount = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.totalCount
);

export const selectPageNumber = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.pageNumber
);

export const selectPageSize = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.pageSize
);

export const selectFilters = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.filters
);

export const selectLoading = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.loading
);

export const selectError = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.error
);

export const selectSupplier = createSelector(
  selectSuppliersState,
  (state: SuppliersState) => state.supplier
);

