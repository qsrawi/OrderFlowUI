import { createReducer, on } from '@ngrx/store';
import { loadCashDetails, loadCashDetailsSuccess, loadCashDetailsFailure } from '../actions/cash.actions';
import { CashDto } from '../../models/cash';

export interface CashState {
  cashDetails: CashDto[];
  loading: boolean;
  error: any;
}

export const initialState: CashState = {
  cashDetails: [],
  loading: false,
  error: null
};

export const cashReducer = createReducer(
  initialState,
  on(loadCashDetails, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(loadCashDetailsSuccess, (state, { cashDetails }) => ({
    ...state,
    cashDetails,
    loading: false
  })),
  on(loadCashDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
