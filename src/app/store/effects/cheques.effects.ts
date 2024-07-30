import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ChequesActions from '../actions/cheques.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class ChequesEffects {
  loadCheques$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadCheques),
      mergeMap(action =>
        this.adminHttpReqService.getCheques(action.chequeType, action.filters).pipe(
            tap(x => console.log(x)),
          map(response => ChequesActions.loadChequesSuccess({ cheques: response.items, totalCount: response.totalCount })),
          catchError(error => of(ChequesActions.loadChequesFailure({ error: error.message })))
        )
      )
    )
  );

  loadChequesBySupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadChequesBySupplier),
      mergeMap(action =>
        this.supplierHttpReq.getChequesBySupplier(action.supplierId, action.filters).pipe(
          map(response => ChequesActions.loadChequesSuccess({ cheques: response.items, totalCount: response.totalCount })),
          catchError(error => of(ChequesActions.loadChequesFailure({ error })))
        )
      )
    )
  );

  loadChequeTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadChequeTransactions),
      mergeMap(action =>
        this.adminHttpReqService.getChequeTransactions(action.chequeId).pipe(
          map(transactions => ChequesActions.loadChequeTransactionsSuccess({ transactions })),
          catchError(error => of(ChequesActions.loadChequeTransactionsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReq: SupplierHttpReqService
  ) {}
}
