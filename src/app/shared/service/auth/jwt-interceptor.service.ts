/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, from, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { RoleGuardService } from './role-guard.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptorService implements HttpInterceptor {
  constructor(
    private roleService: RoleGuardService,
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const now = Date.now() / 1000;
    const expiration = this.roleService.getDecodedJWT().exp;
    const threshold = 25 * 60; // in seconds

    if (expiration - now < threshold) {
      return this.authService.refreshToken().pipe(
        switchMap((newToken) => {
          const newRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`, // Use the new token received from the refresh
            },
          });
          return next.handle(newRequest);
        }),
        catchError((error) => {
          throw error;
        })
      );
    }
    return next.handle(req);
  }
}
