import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, finalize, first, Observable, tap } from 'rxjs';
import { loadAllProperties } from '../store/property.actions';
import { arePropertiesLoaded } from '../store/properties.selectors';

@Injectable()
export class PropertiesResolver implements Resolve<any> {
  store = inject(Store);
  loading = false;
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
