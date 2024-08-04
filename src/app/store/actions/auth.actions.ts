import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string, password: string }>()
);

export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure');

export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ user: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const forCustomer = createAction('[Auth] For Customer', props<{customerId: number}>());
export const forSupplier = createAction('[Auth] For Supplier', props<{supplierId: number}>());
export const allItems = createAction('[Auth] Is All Items', props<{isAllItems: boolean}>());
export const isRecipt = createAction('[Auth] Is Recipt', props<{isRecipt: boolean}>());
export const logout = createAction('[Auth] Logout');