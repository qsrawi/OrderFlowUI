import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChequesState } from '../reducers/cheques.reducer';

export const selectChequesState = createFeatureSelector<ChequesState>('cheques');

export const selectAllCheques = createSelector(
  selectChequesState,
  (state: ChequesState) => state.cheques
);

export const selectTotalCount = createSelector(
  selectChequesState,
  (state: ChequesState) => state.totalCount
);

export const selectLoading = createSelector(
  selectChequesState,
  (state: ChequesState) => state.loading
);

export const selectError = createSelector(
  selectChequesState,
  (state: ChequesState) => state.error
);

export const selectChequeType = createSelector(
  selectChequesState,
  (state: ChequesState) => state.chequeType
);

export const selectchequesToEndorsement = createSelector(
  selectChequesState,
  (state: ChequesState) => state.chequesToEndorsement
);
