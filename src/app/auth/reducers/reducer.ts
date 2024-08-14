import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { AuthState } from '.';

export const initialState: AuthState = {
  loading: false,
  res: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { res }) => ({
    ...state,
    loading: false,
    res: res,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: false,
    res: null,
    error: null,
  }))
);
