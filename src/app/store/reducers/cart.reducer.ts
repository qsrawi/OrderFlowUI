import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export interface CartItem {
  itemId: number;
  quantity: number;
  itemName: string,
  price: number;
}

export interface CartState {
  items: CartItem[];
  orderPlaced: boolean;
  supplierId: number;
  error: string | null;
}

export const initialCartState: CartState = {
  items: [],
  orderPlaced: false,
  supplierId: 0,
  error: null,
};

export const cartReducer = createReducer(
  initialCartState,
  on(CartActions.addItemToCart, (state, { itemId, quantity, itemName, price, supplierId }) => {
    const existingItem = state.items.find(item => item.itemId === itemId);
    if (existingItem) {
      return {
        ...state,
        items: state.items.map(item =>
          item.itemId === itemId
            ? { ...item, quantity: item.quantity + quantity, price: item.price + price }
            : item
        ),
      };
    }
    return {
      ...state,
      items: [...state.items, { itemId, quantity, itemName, price }],
      supplierId: supplierId
    };
  }),
  on(CartActions.updateItemQuantity, (state, { itemId, quantity }) => ({
    ...state,
    items: state.items.map(item =>
      item.itemId === itemId ? { ...item, quantity, price: quantity * (item.price / item.quantity) } : item
    ),
  })),
  on(CartActions.removeItem, (state, { itemId }) => ({
    ...state,
    items: state.items.filter(item => item.itemId !== itemId),
  })),
  on(CartActions.decreaseQuantity, (state, { itemId }) => ({
    ...state,
    items: state.items.map(item =>
      item.itemId === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1, price: item.price - item.price / item.quantity }
        : item
    ),
  })),
  on(CartActions.increaseQuantity, (state, { itemId }) => ({
    ...state,
    items: state.items.map(item =>
      item.itemId === itemId
        ? { ...item, quantity: item.quantity + 1, price: item.price + item.price / item.quantity }
        : item
    ),
  })),
  on(CartActions.placeOrderSuccess, state => ({
    ...state,
    items: [],
    orderPlaced: true,
    error: null
  })),
  on(CartActions.placeOrderFailure, (state, { error }) => ({
    ...state,
    orderPlaced: false,
    error
  }))
);