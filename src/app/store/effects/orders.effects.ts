import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from '../actions/orders.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { CustomerHttpReqService } from '../../services/customerHttpReq.service';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(action =>
        this.adminHttpReqService.getOrders(action.filters).pipe(
          map(response => OrdersActions.loadOrdersSuccess({ response })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrdersBySupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrdersBySupplier),
      mergeMap(action =>
        this.supplierHttpReqService.getOrdersBySupplier(action.supplierId, action.filters).pipe(
          map(response => OrdersActions.loadOrdersSuccess({ response })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  loadOrdersByCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrdersByCustomer),
      mergeMap(action =>
        this.customerHttpReqService.getOrdersByCustomer(action.customerId, action.filters).pipe(
          map(response => OrdersActions.loadOrdersSuccess({ response })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
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
