/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class AuthGuardService {
  constructor(
    public jwtHelper: JwtHelperService,
    public router: Router,
    public notify: NotificationService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const jwt = localStorage.getItem('token');
    if (!jwt || this.jwtHelper.isTokenExpired(jwt)) {
      this.notify.showNotification('warning', '#eb2f96', 'Please Sign In');
      const questionMarkUrl = state.url;
      const newUrlQuestionMark = questionMarkUrl.split('?');
      newUrlQuestionMark.pop();
      if (newUrlQuestionMark[0] == undefined) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
      } else {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: newUrlQuestionMark[0] },
        });
      }
      return false;
    }
    return true;
  }
}
