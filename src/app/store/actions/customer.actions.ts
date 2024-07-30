import { createAction, props } from '@ngrx/store';
import { CustomerBaseDto } from '../../models/customer';

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ id?: number; customer: CustomerBaseDto }>()
);

export const addCustomerSuccess = createAction(
  '[Customer] Add Customer Success'
);

export const addCustomerFailure = createAction(
  '[Customer] Add Customer Failure',
  props<{ error: any }>()
);

export const loadCustomer = createAction(
  '[Customer] Load Customer',
  props<{ id: number }>()
);

export const loadCustomerSuccess = createAction(
  '[Customer] Load Customer Success',
  props<{ customer: CustomerBaseDto }>()
);

export const loadCustomerFailure = createAction(
  '[Customer] Load Customer Failure',
  props<{ error: any }>()
);

export const saveCustomer = createAction(
  '[Customer] Save Customer',
  props<{ id: number | undefined; customer: CustomerBaseDto }>()
);

export const saveCustomerSuccess = createAction(
  '[Customer] Save Customer Success',
  props<{ customer: CustomerBaseDto }>()
);

export const saveCustomerFailure = createAction(
  '[Customer] Save Customer Failure',
  props<{ error: any }>()
);

export const loadCustomers = createAction(
  '[Customer] Load Customers',
  props<{ id: number| undefined, pageNumber: number, pageSize: number, filters: any }>()
);

export const loadCustomersSuccess = createAction(
  '[Customer] Load Customers Success',
  props<{ customers: CustomerBaseDto[], totalCount: number }>()
);

export const loadCustomersFailure = createAction(
  '[Customer] Load Customers Failure',
  props<{ error: string }>()
);