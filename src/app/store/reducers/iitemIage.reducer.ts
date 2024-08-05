import { createReducer, on } from "@ngrx/store";
import * as ImageActions from '../actions/image.actions';

export interface ItemImageState {
    images: { [itemId: number]: string[] };
    loading: boolean;
    error: any;
  }
  
  export const initialState: ItemImageState = {
    images: {},
    loading: false,
    error: null
  };

  export const itemImageReducer = createReducer(
    initialState,
    on(ImageActions.loadImages, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(ImageActions.loadImagesSuccess, (state, { itemId, images }) => ({
      ...state,
      images: { ...state.images, [itemId]: images },
      loading: false,
      error: null
    })),
    on(ImageActions.loadImagesFailure, (state, { itemId, error }) => ({
      ...state,
      images: { ...state.images, [itemId]: [] },
      loading: false,
      error
    }))
  );