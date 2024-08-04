import { createAction, props } from '@ngrx/store';
import { ReceiptDto } from '../../models/receipts';

export const addReceipt = createAction(
  '[Receipt] Add Receipt',
  props<{ receipt: FormData }>()
);

export const addReceiptSuccess = createAction(
  '[Receipt] Add Receipt Success',
);

export const addReceiptFailure = createAction(
  '[Receipt] Add Receipt Failure',
  props<{ error: string }>()
);

export const loadReceipts = createAction(
  '[Receipt] Load Receipts',
  props<{ customerId: number | undefined }>()
);

export const loadReceiptsSuccess = createAction(
  '[Receipt] Load Receipts Success',
  props<{ receipts: ReceiptDto[] }>()
);

export const loadReceiptsFailure = createAction(
  '[Receipt] Load Receipts Failure',
  props<{ error: any }>()
);

export const calculateTotal = createAction('[Receipt] Calculate Total');