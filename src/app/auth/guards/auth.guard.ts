import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AppState } from '../../reducers';
import { isLoggedIn } from '../store/auth.selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
      return this.store
          .pipe(
              select( isLoggedIn ),
              tap( loggedIn => {
                  if ( !loggedIn ) {
                      this.router.navigate(['/auth/login'])
                  }
              })
          )
  }
}
