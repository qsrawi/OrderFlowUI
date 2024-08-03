import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AdminHttpReqService } from '../../services/httpReq.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private adminHttpReqService: AdminHttpReqService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.adminHttpReqService.login(action.username, action.password).pipe(
          map((user: User) => {
            if (user && user.token) {
              // Store the token in localStorage
              localStorage.setItem('authToken', user.token);

              switch (user.role) {
                case 'Supplier':
                  this.router.navigate(['/supplier']);
                  break;
                case 'Admin':
                  this.router.navigate(['/admin']);
                  break;
                case 'Customer':
                  this.router.navigate(['/customer']);
                  break;
                default:
                  return AuthActions.loginFailure();
              }
              return AuthActions.loginSuccess({ user });
            } else {
              return AuthActions.loginFailure();
            }
          }),
          catchError(() => of(AuthActions.loginFailure()))
        )
      )
    )
  );
}
