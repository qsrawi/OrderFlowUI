import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SupplierActions from '../actions/suppliers.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { Router } from '@angular/router';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class SuppliersEffects {
  loadSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActions.loadSuppliers),
      mergeMap(action => {
        const { pageNumber, pageSize, filters, supplierId } = action;
        
        const serviceCall = supplierId !== undefined
          ? this.supplierHttpReqService.getSuppliers(pageNumber, pageSize, filters, supplierId)
          : this.adminHttpReqService.getSuppliers(pageNumber, pageSize, filters);

        return serviceCall.pipe(
          map(response => SupplierActions.loadSuppliersSuccess({ suppliers: response.items, totalCount: response.totalCount })),
          catchError(error => of(SupplierActions.loadSuppliersFailure({ error: error.message })))
        );
      })
    )
  );

  loadSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActions.loadSupplier),
      mergeMap(action =>
        this.adminHttpReqService.getSupplier(action.id).pipe(
          map(supplier => SupplierActions.loadSupplierSuccess({ supplier })),
          catchError(error => of(SupplierActions.loadSupplierFailure({ error })))
        )
      )
    )
  );

  saveSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActions.saveSupplier),
      mergeMap(action =>
        this.adminHttpReqService.saveSupplier(action.id, action.supplier).pipe(
          map(() => SupplierActions.saveSupplierSuccess()),
          catchError(error => of(SupplierActions.saveSupplierFailure({ error })))
        )
      )
    )
  );

  deleteSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActions.deleteSupplier),
      mergeMap(action =>
        this.adminHttpReqService.deleteSupplier(action.id).pipe(
          map(() => SupplierActions.deleteSupplierSuccess({ id: action.id })),
          catchError(error => of(SupplierActions.deleteSupplierFailure({ error })))
        )
      )
    )
  );

  navigateOnSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SupplierActions.saveSupplierSuccess, SupplierActions.deleteSupplierSuccess),
      tap(() => {
        this.router.navigate(['/admin/suppliers-view']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReqService: SupplierHttpReqService,
    private router: Router
  ) {}
}
