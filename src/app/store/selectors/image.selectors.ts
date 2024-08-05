import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ImageState } from '../reducers/image.reducer';

export const selectImageState = createFeatureSelector<ImageState>('images');

export const selectItemImage = createSelector(
  selectImageState,
  (state: ImageState, props: { itemId: number; isFront: boolean }) =>
    props.isFront ? state.images.front[props.itemId] : state.images.back[props.itemId]
);

// export const selectFrontImage = createSelector(
//   selectImageState,
//   (state: ImageState, props: { itemId: number }) => state.images[props.itemId + 1]
// );

// export const selectBackImage = createSelector(
//   selectImageState,
//   (state: ImageState, props: { itemId: number }) => state.images[props.itemId + 2]
// );
