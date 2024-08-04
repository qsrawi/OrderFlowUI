import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from '../actions/customer.actions';
import { CreateSupplierDto, Supplier } from '../../models/supplier';

import { CustomerBaseDto } from '../../models/customer';

export interface CustomerState {
  customers: CustomerBaseDto[];
  customer: CustomerBaseDto | null;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  filters: any;
  loading: boolean;
  error: string | null;
}

export const initialState: CustomerState = {
  customers: [],
  customer: null,
  totalCount: 0,
  pageNumber: 1,
  pageSize: 10,
  filters: {},
  loading: false,
  error: null
};

export const customerReducer = createReducer(
  initialState,
  on(CustomerActions.loadCustomers, (state, { pageNumber, pageSize, filters }) => ({
    ...state,
    pageNumber,
    pageSize,
    filters
  })),
  on(CustomerActions.loadCustomersSuccess, (state, { customers, totalCount }) => ({
    ...state,
    customers,
    totalCount
  })),
  on(CustomerActions.loadCustomersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(CustomerActions.loadCustomer, (state, { id }) => ({
    ...state,
    loading: true
  })),
  on(CustomerActions.loadCustomerSuccess, (state, { customer }) => ({
    ...state,
    customer,
    loading: false,
    error: null
  })),
  on(CustomerActions.loadCustomerFailure, (state, { error }) => ({
    ...state,
    customer: null,
    loading: false,
    error
  })),
  on(CustomerActions.addCustomer, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.addCustomerSuccess, state => ({
    ...state,
    loading: false,
    error: null
  })),
  on(CustomerActions.addCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CustomerActions.saveCustomer, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CustomerActions.saveCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers.filter(c => c.supplierId !== customer.supplierId), customer],
    loading: false,
    error: null
  })),
  on(CustomerActions.saveCustomerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CustomerActions.deleteCustomerSuccess, (state, { id }) => ({
    ...state,
    customers: state.customers.filter(customer => customer.customerId !== id),
    error: null
  })),
  on(CustomerActions.deleteCustomerFailure, (state, { error }) => ({
    ...state,
    error
  })),
);