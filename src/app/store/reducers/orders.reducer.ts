import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from '../actions/orders.actions';
import { Order } from '../../models/orders';

export interface State {
  orders: Order[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  error: any;
}

export const initialState: State = {
  orders: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 5,
  error: null,
};

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrdersSuccess, (state, { response }) => ({
    ...state,
    orders: response.items,
    totalCount: response.totalCount,
    pageNumber: response.pageNumber,
    pageSize: response.pageSize,
    error: null,
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    orders: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 5,
    error,
  }))
);
