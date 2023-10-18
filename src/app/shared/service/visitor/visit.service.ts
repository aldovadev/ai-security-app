import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { newVisitor, otp } from 'src/app/models/visitor-management';

@Injectable()
export class VisitService {
  private baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}

  createVisitor(payload: newVisitor): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.baseUrl + '/visitor/detail', payload, {
      headers: header,
    });
  }

  getOTP(email: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/auth/create/otp/${email}`);
  }

  verifyOTP(payload: otp): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.baseUrl + '/auth/verify/otp', payload, {
      headers: header,
    });
  }

  uploadPicture(payload: FormData, visit_id: string): Observable<any> {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization':`Bearer ${localStorage.getItem('visittoken')}`
    });
    return this.http.post(
      this.baseUrl + `/visitor/upload/${visit_id}`,
      payload,
      { headers: header }
    );
  }
}
