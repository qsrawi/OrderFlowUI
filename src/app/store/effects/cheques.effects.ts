import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as ChequesActions from '../actions/cheques.actions';
import { AdminHttpReqService } from '../../services/httpReq.service';
import { SupplierHttpReqService } from '../../services/supplierHttpReq.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ChequesEffects {
  loadCheques$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadCheques),
      mergeMap(action =>
        this.adminHttpReqService.getCheques(action.chequeType, action.filters).pipe(
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

  loadChequeTransactionsForSupplier$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadChequeTransactionsForSupplier),
      mergeMap(action =>
        this.supplierHttpReq.getChequeTransactions(action.chequeId).pipe(
          map(transactions => ChequesActions.loadChequeTransactionsSuccess({ transactions })),
          catchError(error => of(ChequesActions.loadChequeTransactionsFailure({ error })))
        )
      )
    )
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadTransactions),
      mergeMap(action =>
        this.supplierHttpReq.getTransactions(action.supplierId).pipe(
          map(transactions => ChequesActions.loadChequeTransactionsSuccess({ transactions })),
          catchError(error => of(ChequesActions.loadTransactionsFailure({ error })))
        )
      )
    )
  );

  loadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.loadImage),
      mergeMap(action => {
        const imgReq = action.role === 'Supplier'
          ? this.supplierHttpReq.getImage(action.chequeId, action.isFront)
          : this.adminHttpReqService.getImage(action.chequeId, action.isFront);

        return imgReq.pipe(
          mergeMap(response => {
            const reader = new FileReader();
            return new Promise<string>((resolve, reject) => {
              reader.onloadend = () => resolve(reader.result as string);
              reader.onerror = () => reject('Failed to read file as data URL');
              reader.readAsDataURL(response);
            }).then(
              image => ChequesActions.loadImageSuccess({ itemId: action.chequeId, image, isFront: action.isFront }),
              error => ChequesActions.loadImageFailure({ itemId: action.chequeId, error })
            );
          }),
          catchError(error =>
            of(ChequesActions.loadImageFailure({ itemId: action.chequeId, error }))
          )
        );
      })
    )
  );

  endorsementCheque$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.endorsementCheque),
      mergeMap(action =>
        this.supplierHttpReq.endorseCheques(action.chequesIds, action.supplierId).pipe(
          map(() => ChequesActions.endorsementChequeSuccess()),
          catchError(error => of(ChequesActions.endorsementChequeFailure({ error })))
        )
      )
    )
  );

  endorsementChequeSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ChequesActions.endorsementChequeSuccess),
      tap(() => {
        this.toastr.success('Cheques endorsed successfully!', 'Success');
      }),
      map(() => ChequesActions.clearChequesToEndorsement())
    )
  );

  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private supplierHttpReq: SupplierHttpReqService,
    private toastr: ToastrService
  ) {}
}
