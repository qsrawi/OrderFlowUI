import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCheques from '../reducers/transactions.reducer';

export const selectChequesState = createFeatureSelector<fromCheques.State>('transactions');

export const selectTransactions = createSelector(
  selectChequesState,
  (state: fromCheques.State) => state.transactions
);

export const selectTransactionsError = createSelector(
  selectChequesState,
  (state: fromCheques.State) => state.error
);
