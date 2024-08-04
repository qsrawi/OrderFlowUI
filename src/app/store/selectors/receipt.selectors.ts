import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReceiptState } from '../../models/receipts';

export const selectReceiptState = createFeatureSelector<ReceiptState>('receipt');

export const selectReceiptResponse = createSelector(
  selectReceiptState,
  (state: ReceiptState) => state.receipts
);

export const selectReceiptLoading = createSelector(
  selectReceiptState,
  (state: ReceiptState) => state.loading
);

export const selectReceiptError = createSelector(
  selectReceiptState,
  (state: ReceiptState) => state.error
);
