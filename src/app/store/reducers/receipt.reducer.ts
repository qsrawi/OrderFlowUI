// receipt.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as ReceiptActions from '../actions/receipt.actions';
import { ReceiptState } from '../../models/receipts';

export const initialState: ReceiptState = {
  receipts: [],
  totalAmount: 0,
  remainingDebt: 0,
  loading: false,
  error: null
};

export const receiptReducer = createReducer(
  initialState,
  on(ReceiptActions.addReceipt, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ReceiptActions.addReceiptSuccess, (state) => ({
    ...state,
    loading: false
  })),
  on(ReceiptActions.addReceiptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(ReceiptActions.calculateTotal, (state) => ({
    ...state,
    totalAmount: state.receipts.reduce(
      (total, receipt) =>
        total +
        receipt.cheques.reduce((sum, cheque) => sum + cheque.amount, 0) +
        receipt.cashDetails.reduce((sum, cash) => sum + cash.amount, 0),
      0
    )
  }))
);
