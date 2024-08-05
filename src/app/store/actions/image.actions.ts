import { createAction, props } from '@ngrx/store';

export const loadImages = createAction(
  '[Image] Load Images For Supplier',
  props<{ itemId: number }>()
);

export const loadImagesSuccess = createAction(
  '[Image] Load Images For Supplier Success',
  props<{ itemId: number, images: string[] }>()
);

export const loadImagesFailure = createAction(
  '[Image] Load Images  For Supplier Failure',
  props<{ itemId: number, error: any }>()
);

export const loadImagesForAdmin = createAction(
  '[Image] Load Images For Admin',
  props<{ itemId: number }>()
);

/*export const loadImagesForAdminSuccess = createAction(
  '[Image] Load Images For Admin Success',
  props<{ itemId: number, images: string[] }>()
);

export const loadImagesForAdminFailure = createAction(
  '[Image] Load Images  For Admin Failure',
  props<{ itemId: number, error: any }>()
);*/

export const loadImagesForCustomer = createAction(
  '[Image] Load Images For Customer',
  props<{ itemId: number }>()
);

/*export const loadImagesForCustomerSuccess = createAction(
  '[Image] Load Images For Customer Success',
  props<{ itemId: number, images: string[] }>()
);

export const loadImagesForCustomerFailure = createAction(
  '[Image] Load Images  For Customer Failure',
  props<{ itemId: number, error: any }>()
);*/