import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CartActions from '../actions/cart.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { CustomerHttpReqService } from '../../services/customerHttpReq.service';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private supplierHttpReq: SupplierHttpReqService, private customerHttpReqService: CustomerHttpReqService) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.placeOrder),
      mergeMap(action => {
        const placeOrderRequest = action.customerId
          ? this.customerHttpReqService.placeOrder({
              customerId: action.customerId,
              supplierId: action.supplierId ?? null,
              tradingSupplierId: action.tradingSupplierId ?? null,
              total: action.total,
              orderDate: new Date(),
              orderItems: action.orderItems
            })
          : this.supplierHttpReq.placeOrder({
              customerId: action.customerId ?? null,
              supplierId: action.supplierId ?? null,
              tradingSupplierId: action.tradingSupplierId ?? null,
              total: action.total,
              orderDate: new Date(),
              orderItems: action.orderItems
            });

        return placeOrderRequest.pipe(
          map(() => CartActions.placeOrderSuccess()),
          catchError(error => of(CartActions.placeOrderFailure({ error })))
        );
      })
    )
  );
}
