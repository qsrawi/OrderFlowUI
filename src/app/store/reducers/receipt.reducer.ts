import { createReducer, on } from '@ngrx/store';
import { addReceipt, addReceiptSuccess, addReceiptFailure } from '../actions/receipt.actions';
import { ReceiptDto } from '../../models/receipts';

export interface ReceiptState {
  receipt: ReceiptDto | null;
  loading: boolean;
  error: any;
}

export const initialState: ReceiptState = {
  receipt: null,
  loading: false,
  error: null
};

export const receiptReducer = createReducer(
  initialState,
  on(addReceipt, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(addReceiptSuccess, (state, { receipt }) => ({
    ...state,
    receipt,
    loading: false
  })),
  on(addReceiptFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
