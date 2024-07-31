import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CashState } from '../reducers/cash.reducer';

export const selectCashState = createFeatureSelector<CashState>('cashs');

export const selectAllCashDetails = createSelector(
  selectCashState,
  (state: CashState) => state.cashDetails
);

export const selectCashLoading = createSelector(
  selectCashState,
  (state: CashState) => state.loading
);

export const selectCashError = createSelector(
  selectCashState,
  (state: CashState) => state.error
);
