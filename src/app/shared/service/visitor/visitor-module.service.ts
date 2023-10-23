import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoleGuardService } from '../auth/role-guard.service';
import { Observable } from 'rxjs';
import { visitorStatus } from 'src/app/models/visitor-management';

@Injectable({
  providedIn: 'root',
})
export class VisitorModuleService {
  private baseUrl = environment.baseURL;
  constructor(
    private http: HttpClient,
    private roleGuardService: RoleGuardService
  ) {}

  incomingData: number = 0;
  rejectedData: number = 0;
  acceptedData: number = 0;

  private getCustomHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
  }

  getVisitor(status: string): Observable<any> {
    return this.http.get(
      this.baseUrl + '/visitor?status=' + status,

      { headers: this.getCustomHeaders() }
    );
  }

  visitorStatus(payload: visitorStatus): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/visitor/status', payload, {
      headers: this.getCustomHeaders(),
    });
  }

  deleteVisitor(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/visitor/' + id, {
      headers: this.getCustomHeaders(),
    });
  }

  status: { [statusName: string]: number } = {};

  getStatusId(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/option/visit-status', {
      headers: this.getCustomHeaders(),
    });
  }

  getVisitorProfile(visitorId: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/visitor/profile/' + visitorId, {
      headers: this.getCustomHeaders(),
    });
  }

  getVisitorImage(url: string): Observable<any> {
    return this.http.get<any>(url, {
      headers: this.getCustomHeaders(),
      responseType: 'blob' as 'json',
    });
  }
}
