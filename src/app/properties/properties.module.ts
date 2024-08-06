import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesHttpService } from './services/properties-http.service';
import { PropertiesResolver } from './properties.resolver';
import { EffectsModule } from '@ngrx/effects';
import { PropertiesEffects } from './properties.effects';
import { StoreModule } from '@ngrx/store';
import { propertiesReducer } from './reducers/property.reducers';

export const propertiesRoutes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    resolve: {
      properties: PropertiesResolver,
    },
  },
];

@NgModule({
  declarations: [PropertiesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(propertiesRoutes),
    EffectsModule.forFeature([PropertiesEffects]),
    StoreModule.forFeature('properties', propertiesReducer),
  ],
  exports: [PropertiesComponent],
  providers: [PropertiesHttpService, PropertiesResolver],
})
export class PropertiesModule {
  constructor(){}
}
