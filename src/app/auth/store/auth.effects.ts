import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './action-types';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthHttpService } from '../services/auth-http.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  router = inject(Router);
  constructor(private authHttpService: AuthHttpService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ user }) => {
        return this.authHttpService.login(user).pipe(
          map((response) => {
            const authSuccess = AuthActions.loginSuccess({ res: response });
            localStorage.setItem('auth', JSON.stringify(authSuccess));
            this.router.navigate(['/properties']);
            return authSuccess;
          }),
          catchError((err) => of(AuthActions.loginFailure({ error: err })))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap((action) => {
        localStorage.removeItem('auth');
        this.router.navigate(['/auth/login']);
      })
    )
  );
}
