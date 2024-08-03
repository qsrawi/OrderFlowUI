import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../models/user';

export interface AuthState {
  user: User | null;
  forCustomer: number | undefined;
  forSupplier: number | undefined;
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  forCustomer: 0,
  forSupplier: 0,
  loggedIn: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loggedIn: true, error: null })),
  on(AuthActions.loginFailure, state => ({ ...state, error: 'Login Failed' })),
  on(AuthActions.forCustomer, (state, { customerId }) => ({ ...state, forCustomer:  customerId})),
  on(AuthActions.forSupplier, (state, { supplierId }) => ({ ...state, forSupplier:  supplierId})),
  on(AuthActions.logout, state => ({
    ...state,
    user: null,
    loggedIn: false,
    error: null
  }))
);
