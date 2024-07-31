import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as CashActions from '../actions/cash.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class CashEffects {
  loadCashDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CashActions.loadCashDetails),
      mergeMap(action =>
        this.supplierHttpReq.getCashDetailsBySupplier(action.supplierId).pipe(
          map(cashDetails => CashActions.loadCashDetailsSuccess({ cashDetails })),
          catchError(error => of(CashActions.loadCashDetailsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private supplierHttpReq: SupplierHttpReqService
  ) {}
}
