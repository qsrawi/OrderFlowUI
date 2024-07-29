import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import * as SuppliersActions from '../actions/suppliers.actions';
import { HttpReqService } from '../../services/httpReq.service';

@Injectable()
export class SuppliersEffects {
  loadSuppliers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SuppliersActions.loadSuppliers),
      mergeMap(action =>
        this.httpReqService.getSuppliers(action.pageNumber, action.pageSize, action.filters).pipe(
          map(response => SuppliersActions.loadSuppliersSuccess({ suppliers: response.items, totalCount: response.totalCount })),
          catchError(error => of(SuppliersActions.loadSuppliersFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private httpReqService: HttpReqService
  ) {}
}
