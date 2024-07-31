import { createAction, props } from '@ngrx/store';
import { CashDto } from '../../models/cash';

export const loadCashDetails = createAction(
  '[Cash] Load Cash Details',
  props<{ supplierId: number }>()
);

export const loadCashDetailsSuccess = createAction(
  '[Cash] Load Cash Details Success',
  props<{ cashDetails: CashDto[] }>()
);

export const loadCashDetailsFailure = createAction(
  '[Cash] Load Cash Details Failure',
  props<{ error: any }>()
);
