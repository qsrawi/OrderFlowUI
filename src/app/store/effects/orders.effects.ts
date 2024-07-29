import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as OrdersActions from '../actions/orders.actions';
import { HttpReqService } from '../../services/httpReq.service';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrdersActions.loadOrders),
      mergeMap(action =>
        this.httpReqService.getOrders(action.filters).pipe(
          map(response => OrdersActions.loadOrdersSuccess({ response })),
          catchError(error => of(OrdersActions.loadOrdersFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private httpReqService: HttpReqService) {}
}
