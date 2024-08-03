import { createAction, props } from '@ngrx/store';
import { Cheque, ChequeFilterParams } from '../../models/cheques';
import { Transaction } from '../../models/cheque_transaction';

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
  props<{ transactions: Transaction[] }>()
);

export const loadChequeTransactionsFailure = createAction(
  '[Cheques] Load Cheque Transactions Failure',
  props<{ error: any }>()
);

export const loadTransactions = createAction(
  '[Account Statement] Load Transactions',
  props<{ supplierId: number | undefined }>()
);

export const loadTransactionsSuccess = createAction(
  '[Account Statement] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Account Statement] Load Transactions Failure',
  props<{ error: any }>()
);

export const loadImage = createAction(
  '[Cheques] Load Image',
  props<{ chequeId: number }>()
);

export const loadImageSuccess = createAction(
  '[Cheques] Load Image Success',
  props<{ itemId: number, image: string }>()
);

export const loadImageFailure = createAction(
  '[Cheques] Load Image Failure',
  props<{ itemId: number, error: any }>()
);

export const updateChequesToEndorsement = createAction(
  '[Cheques] Update Cheques to Endorsement',
  props<{ chequeIds: number[] }>()
);

export const clearChequesToEndorsement = createAction(
  '[Cheques] Clear Cheques To Endorsement'
);

export const endorsementCheque = createAction(
  '[Cheques] Endorsement Cheque',
  props<{ chequesIds: number[], supplierId: number }>()
);

export const endorsementChequeSuccess = createAction(
  '[Cheques] Endorsement Cheque Success'
);

export const endorsementChequeFailure = createAction(
  '[Cheques] Endorsement Cheque Failure',
  props<{ error: any }>()
);