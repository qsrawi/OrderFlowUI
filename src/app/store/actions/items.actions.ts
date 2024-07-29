import { createAction, props } from '@ngrx/store';
import { ItemFilterParams, ItemResponse } from '../../models/item';

export const loadItems = createAction(
  '[Items] Load Items',
  props<{ filters: ItemFilterParams }>()
);

export const loadItemsSuccess = createAction(
  '[Items] Load Items Success',
  props<{ response: ItemResponse }>()
);

export const loadItemsFailure = createAction(
  '[Items] Load Items Failure',
  props<{ error: any }>()
);
