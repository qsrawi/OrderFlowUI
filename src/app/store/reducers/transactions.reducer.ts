import { createReducer, on } from '@ngrx/store';
import * as ChequesActions from '../actions/cheques.actions';
import * as CustomerActions from '../actions/customer.actions';
import { Transaction } from '../../models/cheque_transaction';

export interface State {
  transactions: Transaction[];
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
  })),
  on(ChequesActions.loadTransactions, CustomerActions.loadTransactions, state => ({ ...state, loading: true, error: null })),
  on(ChequesActions.loadTransactionsSuccess, CustomerActions.loadTransactionsSuccess, (state, { transactions }) => ({ ...state, transactions, loading: false })),
  on(ChequesActions.loadTransactionsFailure, CustomerActions.loadTransactionsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(CustomerActions.CleanTransactions, state => (initialState))
);
