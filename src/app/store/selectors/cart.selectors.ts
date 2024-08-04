import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

export const selectCartTotalQuantity = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (items) => items.reduce((total, item) => total + item.price, 0)
);

export const selectSupplierId = createSelector(
  selectCartState,
  (state: CartState) => state.supplierId
);