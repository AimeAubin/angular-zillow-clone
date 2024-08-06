import { createAction, props } from '@ngrx/store';
import { Property } from './model/properties';

export const loadAllProperties = createAction(
  '[Properties Resolver] Load All Properties'
);

export const allPropertiesLoaded = createAction(
  '[Load Courses Effect] All Courses Loaded',
  props<{ properties: Property[] }>()
);
