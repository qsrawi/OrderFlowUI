import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ItemsActions from '../../store/actions/items.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

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

  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReqService: SupplierHttpReqService
  ) {}
}
