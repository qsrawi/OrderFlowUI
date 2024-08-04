import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ReceiptActions from '../actions/receipt.actions';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';

@Injectable()
export class ReceiptEffects {
  addReceipt$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReceiptActions.addReceipt),
      mergeMap((action) =>
        this.supplierHttpReqService.addReceipt(action.receipt).pipe(
          map(() => ReceiptActions.addReceiptSuccess()),
          catchError((error) => of(ReceiptActions.addReceiptFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private supplierHttpReqService: SupplierHttpReqService,
  ) {}
}
