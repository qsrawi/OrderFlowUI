import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../reducers/orders.reducer';

export const selectOrdersState = createFeatureSelector<fromOrders.State>('orders');

export const selectAllOrders = createSelector(
  selectOrdersState,
  (state: fromOrders.State) => state.orders
);

export const selectTotalCount = createSelector(
  selectOrdersState,
  (state: fromOrders.State) => state.totalCount
);

export const selectPageNumber = createSelector(
  selectOrdersState,
  (state: fromOrders.State) => state.pageNumber
);

export const selectPageSize = createSelector(
  selectOrdersState,
  (state: fromOrders.State) => state.pageSize
);

export const selectError = createSelector(
  selectOrdersState,
  (state: fromOrders.State) => state.error
);
