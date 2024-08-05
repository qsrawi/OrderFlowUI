import { createReducer, on } from '@ngrx/store';
import * as ItemsActions from '../actions/items.actions';
import { Item } from '../../models/item';

export interface State {
  items: Item[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  error: any;
}

export const initialState: State = {
  items: [],
  totalCount: 0,
  pageNumber: 1,
  pageSize: 5,
  error: null,
};

export const itemsReducer = createReducer(
  initialState,
  on(ItemsActions.loadItemsSuccess, (state, { response }) => ({
    ...state,
    items: response.items,
    totalCount: response.totalCount,
    pageNumber: response.pageNumber,
    pageSize: response.pageSize,
    error: null,
  })),
  on(ItemsActions.loadItemsFailure, (state, { error }) => ({
    ...state,
    items: [],
    totalCount: 0,
    pageNumber: 1,
    pageSize: 10,
    error,
  })),
  on(ItemsActions.deleteItemSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter(item => item.itemId !== id),
    error: null
  })),
  on(ItemsActions.deleteItemFailure, (state, { error }) => ({
    ...state,
    error
  })),
);
