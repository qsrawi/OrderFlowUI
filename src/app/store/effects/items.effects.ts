import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ItemsActions from '../../store/actions/items.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { CustomerHttpReqService } from '../../services/customerHttpReq.service';

@Injectable()
export class ItemsEffects {
  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItems),
      mergeMap(action =>
        this.adminHttpReqService.getItems(action.filters).pipe(
          map(response => ItemsActions.loadItemsSuccess({ response })),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  loadItemsBySupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItemsBySupplier),
      mergeMap(action =>
        this.supplierHttpReqService.getItemsBySupplier(action.supplierId, action.filters).pipe(
          map(response => ItemsActions.loadItemsSuccess({ response })),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  loadItemsForSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItemsForSupplier),
      mergeMap(action =>
        this.supplierHttpReqService.getItemsForSupplier(action.filters).pipe(
          map(response => ItemsActions.loadItemsSuccess({ response })),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  loadItemsByCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItemsForCustomer),
      mergeMap(action =>
        this.customerHttpReqService.getItemsForCustomer(action.customerId, action.filters).pipe(
          map(response => ItemsActions.loadItemsSuccess({ response })),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  loadItemImage$ = createEffect(() => this.actions$.pipe(
    ofType(ItemsActions.loadItemImage),
    mergeMap(action =>
      this.supplierHttpReqService.getItemImage(action.itemId).pipe(
        map(response => {
          const reader = new FileReader();
          return new Promise<string>((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(response);
          });
        }),
        mergeMap(imagePromise => imagePromise.then(
          image => ItemsActions.loadItemImageSuccess({ itemId: action.itemId, image, isFront: true }),
          error => ItemsActions.loadItemImageFailure({ itemId: action.itemId, error })
        )),
        catchError(error => of(ItemsActions.loadItemImageFailure({ itemId: action.itemId, error })))
      )
    )
  ));

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.saveItem),
      mergeMap(action =>
        this.supplierHttpReqService.saveItem(action.id, action.item).pipe(
          map(item => ItemsActions.saveItemSuccess()),
          catchError(error => of(ItemsActions.saveItemFailure({ error })))
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.deleteItem),
      mergeMap(action =>
        this.supplierHttpReqService.deleteItem(action.id).pipe(
          map(() => ItemsActions.deleteItemSuccess({ id: action.id })),
          catchError(error => of(ItemsActions.deleteItemFailure({ error })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReqService: SupplierHttpReqService,
    private customerHttpReqService: CustomerHttpReqService
  ) {}
}
