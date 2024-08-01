import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImageState } from '../reducers/image.reducer';

export const selectImageState = createFeatureSelector<ImageState>('images');

export const selectItemImage = createSelector(
  selectImageState,
  (state: ImageState, props: { itemId: number }) => state.images[props.itemId]
);
