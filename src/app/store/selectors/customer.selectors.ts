import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';

export const selectCustomerState = createFeatureSelector<CustomerState>('customers');

export const selectCustomer = createSelector(
    selectCustomerState,
  (state: CustomerState) => state.customer
);

export const selectAllCustomers = createSelector(
  selectCustomerState,
(state: CustomerState) => state.customers
);

export const selectTotalCount = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.totalCount
);

export const selectPageNumber = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.pageNumber
);

export const selectPageSize = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.pageSize
);

export const selectFilters = createSelector(
  selectCustomerState,
  (state: CustomerState) => state.filters
);

