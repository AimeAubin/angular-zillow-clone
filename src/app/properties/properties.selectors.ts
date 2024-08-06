import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertiesState } from './reducers/property.reducers';
import * as fromProperties from './reducers/property.reducers';

export const selectPropertiesState =
  createFeatureSelector<PropertiesState>('properties');

export const selectAllProperties = createSelector(
  selectPropertiesState,
  fromProperties.selectAll
);

export const arePropertiesLoaded = createSelector(
  selectPropertiesState,
  (state) => state.allPropertiesLoaded
);
