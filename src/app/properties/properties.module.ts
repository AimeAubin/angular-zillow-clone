import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { RouterModule, Routes } from '@angular/router';
import { PropertiesHttpService } from './services/properties-http.service';
import { AddressPipe } from './pipes/address.pipe';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customHeaderInterceptor } from './interceptors/custom-header.interceptor';

export const propertiesRoutes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
  },
];

@NgModule({
  declarations: [PropertiesComponent, AddressPipe],
  imports: [CommonModule, RouterModule.forChild(propertiesRoutes)],
  exports: [PropertiesComponent, AddressPipe],
  providers: [
    PropertiesHttpService,
    provideHttpClient(withInterceptors([customHeaderInterceptor])),
  ],
})
export class PropertiesModule {
  constructor() {}
}
