import { createAction, props } from '@ngrx/store';
import { OrderItemDto } from '../../models/orders';

export const addItemToCart = createAction(
  '[Cart] Add Item',
  props<{ itemId: number; quantity: number; itemName: string, price: number, supplierId: number }>()
);

export const updateItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ itemId: number; quantity: number }>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{ itemId: number }>()
);

export const decreaseQuantity = createAction(
  '[Cart] Decrease Quantity',
  props<{ itemId: number }>()
);

export const increaseQuantity = createAction(
  '[Cart] Increase Quantity',
  props<{ itemId: number }>()
);

export const placeOrder = createAction(
  '[Cart] Place Order',
  props<{ orderItems: OrderItemDto[], total: number, supplierId: number | undefined, customerId: number | undefined, tradingSupplierId: number | undefined }>()
);

export const placeOrderSuccess = createAction('[Cart] Place Order Success');
export const placeOrderFailure = createAction(
  '[Cart] Place Order Failure',
  props<{ error: any }>()
);