import { createReducer, on, Action } from '@ngrx/store';
import * as ItemImageActions from '../../store/actions/items.actions';
import * as ImageActions from '../../store/actions/cheques.actions';

export interface ImageState {
  images: {
    front: { [key: number]: string };
    back: { [key: number]: string };
  };
  error: any;
}

export const initialState: ImageState = {
  images: {front: {}, back: {}},
  error: null,
};

export const imageReducer = createReducer(
  initialState,
  on(ItemImageActions.loadItemImageSuccess, ImageActions.loadImageSuccess, (state, { itemId, image, isFront }) => ({
    ...state,
    images: {
      ...state.images,
      front: isFront
        ? { ...state.images.front, [itemId]: image }
        : state.images.front,
      back: !isFront
        ? { ...state.images.back, [itemId]: image }
        : state.images.back,
    },
    error: null,
  })),
  on(ItemImageActions.loadItemImageFailure, ImageActions.loadImageFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: ImageState | undefined, action: Action) {
  return imageReducer(state, action);
}
