import { createAction, props } from '@ngrx/store';
import { OrderFilterParams, OrderResponse } from '../../models/orders';

export const loadOrders = createAction(
  '[Orders] Load Orders',
  props<{ filters: OrderFilterParams }>()
);

export const loadOrdersBySupplier = createAction(
  '[Orders] Load Orders By Supplier',
  props<{ supplierId: number | undefined, filters: OrderFilterParams }>()
);

export const loadOrdersByCustomer = createAction(
  '[Orders] Load Orders By Customer',
  props<{ customerId: number | undefined, filters: OrderFilterParams }>()
);

export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ response: OrderResponse }>()
);

export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: any }>()
);
