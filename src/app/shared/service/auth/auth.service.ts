/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from 'src/app/models/auth.model';

@Injectable()
export class AuthService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) { }

  private getCustomHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
  }

  login(payload: Login): Observable<any> {
    return this.http.post(this.baseUrl + '/auth/login', payload);
  }

  refreshToken(): Observable<any> {
    return this.http.get(this.baseUrl + '/auth/refresh', {
      headers: this.getCustomHeaders(),
    });
  }
}
