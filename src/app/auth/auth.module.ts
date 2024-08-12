import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthHttpService } from './services/auth-http.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customAuthInterceptor } from './interceptors/custom-auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [],
  providers: [
    AuthHttpService,
    provideHttpClient(withInterceptors([customAuthInterceptor])),
  ],
})
export class AuthModule {}
