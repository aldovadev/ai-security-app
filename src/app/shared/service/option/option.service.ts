/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) { }
  private getCustomHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  companyOption(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/option/company', {
      headers: this.getCustomHeaders(),
    });
  }
}
