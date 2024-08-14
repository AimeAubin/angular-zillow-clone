import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuthFailure, selectAuthSuccess, selectIsLoading } from '../store/auth.selectors';
import { AuthActions } from '../store/action-types';
import { UserLogin } from '../model/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  store = inject(Store);
  loginForm: FormGroup;
  isLoading = this.store.selectSignal( selectIsLoading );
  isError = this.store.selectSignal( selectAuthFailure );
  isSuccess$ = this.store.select( selectAuthSuccess );

  constructor(
    private fb: FormBuilder  )
  {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  userLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const user:UserLogin = this.loginForm.value;

    this.store.dispatch( AuthActions.login( { user } ) );
  }
}
