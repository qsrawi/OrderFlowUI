import { createAction, props } from '@ngrx/store';
import { CreateReceiptDto, ReceiptDto } from '../../models/receipts';

export const addReceipt = createAction(
  '[Receipt] Add Receipt',
  props<{ receipt: CreateReceiptDto }>()
);

export const addReceiptSuccess = createAction(
  '[Receipt] Add Receipt Success',
  props<{ receipt: ReceiptDto }>()
);

export const addReceiptFailure = createAction(
  '[Receipt] Add Receipt Failure',
  props<{ error: any }>()
);
