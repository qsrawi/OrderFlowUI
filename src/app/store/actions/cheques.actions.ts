import { createAction, props } from '@ngrx/store';
import { Cheque, ChequeFilterParams } from '../../models/cheques';

export const loadCheques = createAction(
  '[Cheques] Load Cheques',
  props<{ chequeType: string, filters: ChequeFilterParams }>()
);

export const loadChequesSuccess = createAction(
  '[Cheques] Load Cheques Success',
  props<{ cheques: Cheque[], totalCount: number }>()
);

export const loadChequesFailure = createAction(
  '[Cheques] Load Cheques Failure',
  props<{ error: string }>()
);
