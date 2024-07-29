import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from '../../models/user';

export interface AuthState {
  user: User | null;
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { user }) => ({ ...state, user, loggedIn: true, error: null })),
  on(AuthActions.loginFailure, state => ({ ...state, error: 'Login Failed' })),
);
