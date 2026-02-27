import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from 'src/app/core/config/api-endpoints';
import {  AuthResponse, LoginRequest, RegisterRequest } from 'src/app/core/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<void> {
    return this.http.post<void>(
      API_ENDPOINTS.auth.registerUser,
      data
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      API_ENDPOINTS.auth.validateLogin,
      data
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
