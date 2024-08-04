import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.role
);

export const selectUserId = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.userId
);

export const selectforCustomer = createSelector(
  selectAuthState,
  (state: AuthState) => state.forCustomer
);

export const selectforSupplier = createSelector(
  selectAuthState,
  (state: AuthState) => state.forSupplier
);

export const  selectisAllItems = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAllItems
);

export const  selectIsRecipt = createSelector(
  selectAuthState,
  (state: AuthState) => state.isRecipt
);