import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CustomerActions from '../actions/customer.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { Router } from '@angular/router';
import { CustomerHttpReqService } from '../../services/customerHttpReq.service';
import { AdminHttpReqService } from '../../services/httpReq.service';

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

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.saveCustomer),
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
          map(response => CustomerActions.loadCustomersSuccess({ customers: response.items, totalCount: response.totalCount })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );

  loadCustomersForAdmin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadCustomersForAdmin),
      mergeMap(action =>
        this.adminHttpReqService.getCustomersForAdmin(action.id, action.pageNumber, action.pageSize, action.filters).pipe(
          map(response => CustomerActions.loadCustomersSuccess({ customers: response.items, totalCount: response.totalCount })),
          catchError(error => of(CustomerActions.loadCustomersFailure({ error: error.message })))
        )
      )
    )
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.loadTransactions),
      mergeMap(action => {
        const role = action.role == "Supplier"
        ? this.supplierHttpReqService.getTransactionsForCustomer(action.customerId)
        : this.customerHttpReqService.getTransactionsForCustomer(action.customerId)
        return role.pipe(
          map(transactions => CustomerActions.loadTransactionsSuccess({ transactions })),
          catchError(error => of(CustomerActions.loadTransactionsFailure({ error })))
        )
      })
    )
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerActions.deleteCustomer),
      mergeMap(action =>
        this.supplierHttpReqService.deleteCustomer(action.id).pipe(
          map(() => CustomerActions.deleteCustomerSuccess({ id: action.id })),
          catchError(error => of(CustomerActions.deleteCustomerFailure({ error })))
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
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReqService: SupplierHttpReqService,
    private customerHttpReqService: CustomerHttpReqService,
    private router: Router
  ) {}
}
