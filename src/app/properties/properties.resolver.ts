import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { loadAllProperties } from './property.actions';
import { arePropertiesLoaded } from './properties.selectors';

@Injectable()
export class PropertiesResolver implements Resolve<any> {
  loading = false;
  constructor(private store: Store<AppState>) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      select(arePropertiesLoaded),
      tap((propertiesLoaded) => {
        if (!this.loading && !propertiesLoaded) {
          this.loading = true;
          this.store.dispatch(loadAllProperties());
        }
      }),
      filter((propertiesLoaded) => propertiesLoaded),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
