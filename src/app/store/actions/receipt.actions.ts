import { createAction, props } from '@ngrx/store';
import { Receipt } from '../../models/receipts';

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

export const calculateTotal = createAction('[Receipt] Calculate Total');