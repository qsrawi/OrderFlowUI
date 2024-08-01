import { createReducer, on, Action } from '@ngrx/store';
import * as ItemImageActions from '../../store/actions/items.actions';

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
  on(ItemImageActions.loadItemImageSuccess, (state, { itemId, image }) => ({
    ...state,
    images: {
      ...state.images,
      [itemId]: image,
    },
    error: null,
  })),
  on(ItemImageActions.loadItemImageFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: ImageState | undefined, action: Action) {
  return imageReducer(state, action);
}
