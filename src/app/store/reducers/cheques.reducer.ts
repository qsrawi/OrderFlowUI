import { createReducer, on } from '@ngrx/store';
import * as ChequesActions from '../actions/cheques.actions';
import { Cheque } from '../../models/cheques';

export interface ChequesState {
  cheques: Cheque[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  chequeType: string;
  chequesToEndorsement: number[];
}

export const initialState: ChequesState = {
  cheques: [],
  totalCount: 0,
  loading: false,
  error: null,
  chequeType: 'Outgoing',
  chequesToEndorsement: []
};

export const chequesReducer = createReducer(
  initialState,
  on(ChequesActions.loadCheques, (state, { chequeType, filters }) => ({
    ...state,
    loading: true,
    chequeType
  })),
  on(ChequesActions.loadChequesSuccess, (state, { cheques, totalCount }) => ({
    ...state,
    cheques,
    totalCount,
    loading: false
  })),
  on(ChequesActions.loadChequesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ChequesActions.updateChequesToEndorsement, (state, { chequeIds }) => ({
    ...state,
    chequesToEndorsement: chequeIds
  })),
  on(ChequesActions.clearChequesToEndorsement, state => ({
    ...state,
    chequesToEndorsement: []
  }))
);
