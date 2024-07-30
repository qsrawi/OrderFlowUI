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

  loadSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomers),
      mergeMap(action =>
        this.supplierHttpReqService.getSuppliers(action.id, action.pageNumber, action.pageSize, action.filters).pipe(
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
        this.router.navigate(['/Supplier/Customer-view']);
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
