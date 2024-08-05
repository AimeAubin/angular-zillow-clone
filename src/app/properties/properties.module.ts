import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesComponent } from './properties/properties.component';
import { RouterModule, Routes } from '@angular/router';

export const propertiesRoutes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
  },
];

@NgModule({
  declarations: [PropertiesComponent],
  imports: [CommonModule, RouterModule.forChild(propertiesRoutes)],
  exports: [PropertiesComponent],
  providers: [],
})
export class PropertiesModule {}
