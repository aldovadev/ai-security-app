/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewEmployee } from 'src/app/models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = environment.baseURL;
  constructor(private http: HttpClient) {}

  private getCustomHeaders(): HttpHeaders {
    const accessToken = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
  }

  getEmployee(companyId: string): Observable<any>{
    return this.http.get<any>(this.baseUrl + '/employee/' + companyId, {
      headers: this.getCustomHeaders(),
    });
  }

  createEmployee(payload: NewEmployee): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/employee', payload, {
      headers: this.getCustomHeaders(),
    });
  }

  deleteEmployee(employeeId:string):Observable<any>{
    return this.http.delete(this.baseUrl+'/employee/'+employeeId,{headers:this.getCustomHeaders()})
  }

  uploadImage(employeeId:string,payload:FormData):Observable<any>{
    const header = new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    return this.http.post<any>(this.baseUrl +'/employee/upload/'+employeeId,payload,{headers:header})
  }
}
