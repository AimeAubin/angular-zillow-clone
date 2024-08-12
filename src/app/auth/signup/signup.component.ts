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
      return;
    }

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
        catchError(this.handleError)
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.statusText}`;
    } else {
      errorMessage = `Error: ${error.error.error}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
