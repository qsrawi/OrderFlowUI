import { createReducer, on } from '@ngrx/store';
import { addItem, addItemSuccess, addItemFailure } from '../actions/item.actions';
import { CreateItemDto } from '../../models/items';

export interface ItemState {
  items: CreateItemDto[];
  loading: boolean;
  error: any;
}

export const initialState: ItemState = {
  items: [],
  loading: false,
  error: null
};

export const itemReducer = createReducer(
  initialState,
  on(addItem, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(addItemSuccess, (state, { item }) => ({
    ...state,
    items: [...state.items, item],
    loading: false,
    error: null
  })),
  on(addItemFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
