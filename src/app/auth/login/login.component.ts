import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHttpService } from '../services/auth-http.service';
import { catchError, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authHttpService: AuthHttpService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  userLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authHttpService
      .login({
        email,
        password,
      })
      .pipe(
        tap( ( res ) => console.log( res ) ),
        catchError(this.handleError)
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/properties']);
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
