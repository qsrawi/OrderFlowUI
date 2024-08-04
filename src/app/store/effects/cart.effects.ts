import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CartActions from '../actions/cart.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private supplierHttpReq: SupplierHttpReqService) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.placeOrder),
      mergeMap(action =>
        this.supplierHttpReq.placeOrder({
          customerId: action.customerId?? null,
          supplierId: action.supplierId?? null,
          tradingSupplierId: action.tradingSupplierId?? null,
          total: action.total,
          orderDate: new Date(),
          orderItems: action.orderItems
        }).pipe(
          map(() => CartActions.placeOrderSuccess()),
          catchError(error => of(CartActions.placeOrderFailure({ error })))
        )
      )
    )
  );
}
