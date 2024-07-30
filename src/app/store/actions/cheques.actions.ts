import { createAction, props } from '@ngrx/store';
import { Cheque, ChequeFilterParams } from '../../models/cheques';
import { ChequeTransaction } from '../../models/cheque_transaction';

export const loadCheques = createAction(
  '[Cheques] Load Cheques',
  props<{ chequeType: string, filters: ChequeFilterParams }>()
);

export const loadChequesSuccess = createAction(
  '[Cheques] Load Cheques Success',
  props<{ cheques: Cheque[], totalCount: number }>()
);

export const loadChequesBySupplier = createAction(
  '[Cheques] Load Cheques By Supplier',
  props<{ supplierId: number| undefined, filters: ChequeFilterParams }>()
);

export const loadChequesFailure = createAction(
  '[Cheques] Load Cheques Failure',
  props<{ error: string }>()
);

export const loadChequeTransactions = createAction(
  '[Cheques] Load Cheque Transactions',
  props<{ chequeId: number }>()
);

export const loadChequeTransactionsSuccess = createAction(
  '[Cheques] Load Cheque Transactions Success',
  props<{ transactions: ChequeTransaction[] }>()
);

export const loadChequeTransactionsFailure = createAction(
  '[Cheques] Load Cheque Transactions Failure',
  props<{ error: any }>()
);
