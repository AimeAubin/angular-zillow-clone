import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Property } from '../model/properties';
import { createReducer, on } from '@ngrx/store';
import { PropertyActions } from '../action-types';
import { allPropertiesLoaded } from '../property.actions';

export interface PropertiesState extends EntityState<Property> {
  allPropertiesLoaded: boolean;
}

export const adapter = createEntityAdapter<Property>({
  selectId: (property) => property.zpid,
});

export const initialPropertiesState = adapter.getInitialState( {
  allPropertiesLoaded:false
});

export const propertiesReducer = createReducer(
  initialPropertiesState,
  on(PropertyActions.allPropertiesLoaded, (state, action) =>
    adapter.setAll(action.properties, { ...state, allPropertiesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
