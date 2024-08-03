import { createReducer, on, Action } from '@ngrx/store';
import * as ItemImageActions from '../../store/actions/items.actions';
import * as ImageActions from '../../store/actions/cheques.actions';

export interface ImageState {
  images: { [key: number]: string };
  error: any;
}

export const initialState: ImageState = {
  images: {},
  error: null,
};

export const imageReducer = createReducer(
  initialState,
  on(ItemImageActions.loadItemImageSuccess, ImageActions.loadImageSuccess, (state, { itemId, image }) => ({
    ...state,
    images: {
      ...state.images,
      [itemId]: image,
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
