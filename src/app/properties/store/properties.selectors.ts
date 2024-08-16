import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertiesState } from '../reducers/property.reducers';
import * as fromProperties from '../reducers/property.reducers';

export const selectPropertiesState =
  createFeatureSelector<PropertiesState>('properties');

export const selectAllProperties = createSelector(
  selectPropertiesState,
  fromProperties.selectAll
);

export const selectCondoProperties = createSelector(
  selectAllProperties,
  (properties) =>
    properties.filter((property) => property.propertyType == 'condo')
);

export const selectSingleFamilyProperties = createSelector(
  selectAllProperties,
  (properties) =>
    properties.filter((property) => property.propertyType == 'singleFamily')
);

export const selectTownHomeProperties = createSelector(
  selectAllProperties,
  (properties) =>
    properties.filter((property) => property.propertyType == 'townhome')
);

export const arePropertiesLoaded = createSelector(
  selectPropertiesState,
  (state) => state.allPropertiesLoaded
);
