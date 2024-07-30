import { createAction, props } from '@ngrx/store';
import { CustomerBaseDto } from '../../models/customer';

export const addCustomer = createAction(
  '[Customer] Add Customer',
  props<{ customer: CustomerBaseDto }>()
);

export const addCustomerSuccess = createAction(
    '[Customer] Add Customer Success'
  );
  
  export const addCustomerFailure = createAction(
    '[Customer] Add Customer Failure',
    props<{ error: any }>()
  );
