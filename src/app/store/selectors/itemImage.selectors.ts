import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ItemImageState } from "../reducers/iitemIage.reducer";

export const selectImageState = createFeatureSelector<ItemImageState>('itemImages');

export const selectImagesByItemId = createSelector(
  selectImageState,
  (state: ItemImageState, props: { itemId: number }) => state.images[props.itemId] || []
);

export const selectImageLoading = createSelector(
  selectImageState,
  (state: ItemImageState) => state.loading
);

export const selectImageError = createSelector(
  selectImageState,
  (state: ItemImageState) => state.error
);