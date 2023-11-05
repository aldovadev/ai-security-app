/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddCompany } from 'src/app/models/company.model';

@Injectable()
export class DashboardService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) { }

  private getCustomHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
  }

  addCompany(payload: AddCompany): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/user', payload, {
      headers: this.getCustomHeaders(),
    });
  }

  getCompany(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/user', {
      headers: this.getCustomHeaders(),
    });
  }
}
