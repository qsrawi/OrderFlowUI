import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CustomerActions from '../actions/customer.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { Router } from '@angular/router';

@Injectable()
export class CustomerEffects {
  addCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomer),
      mergeMap(action =>
        this.supplierHttpReqService.saveCustomer(action.id, action.customer).pipe(
          map(() => CustomerActions.addCustomerSuccess()),
          catchError(error => of(CustomerActions.addCustomerFailure({ error })))
        )
      )
    )
  );

  loadCustomersBySupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(action =>
        this.supplierHttpReqService.getCustomersBySupplier(action.id, action.pageNumber, action.pageSize, action.filters).pipe(
          tap(x => console.log('customers', x)),
          map(response => CustomerActions.loadCustomersSuccess({ customers: response.items, totalCount: response.totalCount })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.addCustomerSuccess),
      tap(() => {
        this.router.navigate(['/supplier/customers-view']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private supplierHttpReqService: SupplierHttpReqService,
    private router: Router
  ) {}
}
