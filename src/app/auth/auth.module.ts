import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttpService } from './services/auth-http.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customAuthInterceptor } from './interceptors/custom-auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { AuthGuard } from './guards/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';
import { authReducer } from './reducers/reducer';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  providers: [
    AuthHttpService,
    AuthGuard,
    provideHttpClient(withInterceptors([customAuthInterceptor])),
  ],
})
export class AuthModule {}
