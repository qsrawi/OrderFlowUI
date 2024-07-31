import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ItemsActions from '../../store/actions/items.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { CustomerHttpReqService } from '../../services/customerHttpReq.service';
import { CustomerBaseDto } from '../../models/customer';

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

  loadItemsByCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.loadItemsForCustomer),
      mergeMap(action =>
        this.customerHttpReqService.loadCustomer(action.customerId).pipe(
          mergeMap((customer: CustomerBaseDto) => {
            const supplierId = customer.supplierId;

            return this.customerHttpReqService.getItemsForCustomer(supplierId, action.filters).pipe(
              map(response => ItemsActions.loadItemsSuccess({ response })),
              catchError(error => of(ItemsActions.loadItemsFailure({ error })))
            );
          }),
          catchError(error => of(ItemsActions.loadItemsFailure({ error })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsActions.addItem),
      mergeMap(action =>
        this.supplierHttpReqService.addItem(action.item).pipe(
          map(item => ItemsActions.addItemSuccess()),
          catchError(error => of(ItemsActions.addItemFailure({ error })))
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
