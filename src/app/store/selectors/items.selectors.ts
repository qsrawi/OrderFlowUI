import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItems from '../reducers/items.reducer';

export const selectItemsState = createFeatureSelector<fromItems.State>('items');

export const selectAllItems = createSelector(
  selectItemsState,
  (state: fromItems.State) => state.items
);

export const selectTotalCount = createSelector(
  selectItemsState,
  (state: fromItems.State) => state.totalCount
);

export const selectPageNumber = createSelector(
  selectItemsState,
  (state: fromItems.State) => state.pageNumber
);

export const selectPageSize = createSelector(
  selectItemsState,
  (state: fromItems.State) => state.pageSize
);

export const selectError = createSelector(
  selectItemsState,
  (state: fromItems.State) => state.error
);
