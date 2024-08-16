import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesHttpService } from './services/properties-http.service';
import { AddressPipe } from './pipes/address.pipe';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customHeaderInterceptor } from './interceptors/custom-header.interceptor';
import { AuthGuard } from '../auth/guards/auth.guard';
import { PropertiesResolver } from './resolvers/properties.resolver';
import { EffectsModule } from '@ngrx/effects';
import { PropertiesEffects } from './store/properties.effects';
import { StoreModule } from '@ngrx/store';
import { propertiesReducer } from './reducers/property.reducers';
import { MatTabsModule } from '@angular/material/tabs';

export const propertiesRoutes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    canActivate: [AuthGuard],
    resolve: {
      PropertiesResolver,
    },
  },
];

@NgModule({
  declarations: [PropertiesComponent, AddressPipe],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(propertiesRoutes),
    EffectsModule.forFeature([PropertiesEffects]),
    StoreModule.forFeature('properties', propertiesReducer),
  ],
  exports: [PropertiesComponent, AddressPipe],
  providers: [
    PropertiesHttpService,
    PropertiesResolver,
    provideHttpClient(withInterceptors([customHeaderInterceptor])),
  ],
})
export class PropertiesModule {
  constructor() {}
}
