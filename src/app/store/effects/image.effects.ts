import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SupplierHttpReqService } from "../../services/supplierHttpReq.service";
import { catchError, map, mergeMap, of } from "rxjs";
import * as ImageActions from '../actions/image.actions';
import { AdminHttpReqService } from "../../services/httpReq.service";
import { CustomerHttpReqService } from "../../services/customerHttpReq.service";

@Injectable()
export class ImageEffects {
  constructor(
    private actions$: Actions,
    private supplierHttpReqService: SupplierHttpReqService,
    private customerHttpReqService: CustomerHttpReqService,
    private adminHttpReqService: AdminHttpReqService
  ) {}

  loadImagesForAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.loadImagesForAdmin),
      mergeMap(action =>
        this.adminHttpReqService.getImages(action.itemId).pipe(
          map(images => ImageActions.loadImagesSuccess({ itemId: action.itemId, images })),
          catchError(error => of(ImageActions.loadImagesFailure({ itemId: action.itemId, error })))
        )
      )
    )
  );

  loadImagesForSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.loadImages),
      mergeMap(action =>
        this.supplierHttpReqService.getImages(action.itemId).pipe(
          map(images => ImageActions.loadImagesSuccess({ itemId: action.itemId, images })),
          catchError(error => of(ImageActions.loadImagesFailure({ itemId: action.itemId, error })))
        )
      )
    )
  );

  loadImagesForCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ImageActions.loadImagesForCustomer),
      mergeMap(action =>
        this.customerHttpReqService.getImages(action.itemId).pipe(
          map(images => ImageActions.loadImagesSuccess({ itemId: action.itemId, images })),
          catchError(error => of(ImageActions.loadImagesFailure({ itemId: action.itemId, error })))
        )
      )
    )
  );
}