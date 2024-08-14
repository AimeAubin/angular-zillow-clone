import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(selectAuthState, (auth) => !!auth.res);

export const selectIsLoading = createSelector(
  selectAuthState,
  (auth) => auth.loading
);

export const selectAuthSuccess = createSelector(
  selectAuthState,
  (auth) => auth.res
);

export const selectAuthFailure = createSelector(
  selectAuthState,
  (auth) => auth.error
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
