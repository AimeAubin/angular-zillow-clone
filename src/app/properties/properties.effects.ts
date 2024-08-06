import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PropertyActions } from './action-types';
import { PropertiesHttpService } from './services/properties-http.service';
import { concatMap, map } from 'rxjs';
import { allPropertiesLoaded } from './property.actions';

@Injectable()
export class PropertiesEffects {
  loadProperties$ = createEffect(
    () =>
    this.actions$.pipe(
      ofType(PropertyActions.loadAllProperties),
      concatMap((action) => this.propertiesHttpService.getAllProperties()),
      map((properties) => allPropertiesLoaded({ properties }))
    )
  );

  constructor(
    private actions$: Actions,
    private propertiesHttpService: PropertiesHttpService
  ) {}
}
