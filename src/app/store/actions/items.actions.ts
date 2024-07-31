import { createAction, props } from '@ngrx/store';
import { ItemFilterParams, ItemResponse } from '../../models/item';
import { CreateItemDto } from '../../models/items';

export const loadItems = createAction(
  '[Items] Load Items',
  props<{ filters: ItemFilterParams }>()
);

export const loadItemsBySupplier = createAction(
  '[Items] Load Items By Supplier',
  props<{ supplierId: number | undefined, filters: ItemFilterParams }>()
);

export const loadItemsForCustomer = createAction(
  '[Items] Load Items For Customer',
  props<{ customerId: number | undefined, filters: ItemFilterParams }>()
);

export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ response: ItemResponse }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);

export const addItem = createAction(
  '[Item] Add Item',
  props<{ item: CreateItemDto }>()
);

export const addItemSuccess = createAction(
  '[Item] Add Item Success'
);

export const addItemFailure = createAction(
  '[Item] Add Item Failure',
  props<{ error: any }>()
);
