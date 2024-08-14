import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PropertyActions } from './action-types';
import { concatMap, map } from 'rxjs';
import { PropertiesHttpService } from '../services/properties-http.service';
import { loadPropertiesSuccess } from './property.actions';

@Injectable()
export class PropertiesEffects {
    actions$ = inject( Actions );
    propertiesHttpService=inject(PropertiesHttpService)
    
    loadProperties$ = createEffect(
        () => this.actions$
            .pipe(
                ofType( PropertyActions.loadAllProperties ),
                concatMap( (action) => this.propertiesHttpService.getAllProperties() ),
                map(properties=>loadPropertiesSuccess({properties}))
            )
    );
}
