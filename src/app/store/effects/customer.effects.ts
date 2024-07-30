import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CustomerActions from '../actions/customer.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class CustomerEffects {
  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      mergeMap(action =>
        this.supplierHttpReqService.addCustomer(action.customer).pipe(
          map(() => CustomerActions.addCustomerSuccess()),
          catchError(error => of(CustomerActions.addCustomerFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private supplierHttpReqService: SupplierHttpReqService
  ) {}
}
