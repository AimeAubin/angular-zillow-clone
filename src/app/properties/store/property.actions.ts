import { createAction, props } from "@ngrx/store";
import { Property } from "../model/properties";

export const loadAllProperties = createAction(
    '[Property Resolver] Load All Properties'
);

export const loadPropertiesSuccess = createAction(
    '[Load Properties Effect] All Properties Loaded',
    props<{properties:Property[]}>()
)