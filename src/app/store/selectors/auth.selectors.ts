import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserRole = createSelector(
  selectAuthState,
  (state: AuthState) => state.user?.role
);
