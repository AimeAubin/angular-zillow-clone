import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../model/auth';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  signUp(user: User): Observable<Partial<AuthResponse>> {
    return this.http.post<AuthResponse>(`${environment.authBaseUrl}/signup`, user);
  }

  login ( user: Partial<User> ): Observable<Partial<AuthResponse>> {
    return this.http.post<AuthResponse>(`${environment.authBaseUrl}/login`, user);
  }
}
