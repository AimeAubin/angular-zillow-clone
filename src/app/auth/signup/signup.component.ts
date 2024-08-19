import { Component } from '@angular/core';
import { AuthHttpService } from '../services/auth-http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private authHttpService: AuthHttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  userSignup() {
    if (this.signupForm.invalid) {
      this.errorMessage = 'Please fill out all the required fields correctly.';
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    const { firstName, lastName, email, password } = this.signupForm.value;

    this.authHttpService
      .signUp({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      })
      .pipe(
        tap((res) => console.log(res)),
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: () => {
          this.successMessage = 'Sign up successful! Redirecting to login...';
          setTimeout(() => {
            this.router.navigate(['/auth/login']);
          }, 2000);
        },
        error: ( err ) => {
          this.errorMessage = err.message;
        },
      });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `${error.statusText}`;
    } else {
      errorMessage = `${error.error.error}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
