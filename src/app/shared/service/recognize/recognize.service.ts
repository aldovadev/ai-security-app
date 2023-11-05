/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleGuardService } from '../auth/role-guard.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class recognizeService {
  private baseUrl = environment.baseURL;
  constructor(
    private http: HttpClient,
    private roleGuardService: RoleGuardService
  ) { }

  private getCustomHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
  }

  recognizeImage(payload: FormData): Observable<any> {
    const header = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(
      this.baseUrl + '/recognize/face/',
      payload,
      { headers: header },
    );
  }

  recognizeQR(companyId: string): Observable<any> {
    const header = this.getCustomHeaders()
    return this.http.post<any>(
      this.baseUrl + '/recognize/qr/' + companyId,
      null,
      { headers: header },
    );
  }

  recognizeSetup(): Observable<any> {
    const header = this.getCustomHeaders()
    return this.http.post<any>(
      this.baseUrl + '/recognize/setup/',
      null,
      { headers: header },
    );
  }
}
