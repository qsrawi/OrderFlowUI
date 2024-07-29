import { createReducer, on } from '@ngrx/store';
import * as ChequesActions from '../actions/cheques.actions';
import { ChequeTransaction } from '../../models/cheque_transaction';

export interface State {
  transactions: ChequeTransaction[];
  error: any;
}

export const initialState: State = {
  transactions: [],
  error: null,
};

export const transactionsReducer = createReducer(
  initialState,
  on(ChequesActions.loadChequeTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    error: null,
  })),
  on(ChequesActions.loadChequeTransactionsFailure, (state, { error }) => ({
    ...state,
    transactions: [],
    error,
  }))
);
