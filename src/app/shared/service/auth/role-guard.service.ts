import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import decode from 'jwt-decode';
import { NotificationService } from '../notification/notification.service';
import jwtDecode from 'jwt-decode';

type userInfo = {
  companyName: string;
  email: string;
  userRole: string;
};
type decoded = {
  iat: number;
  exp: number;
  userInfo: userInfo;
};

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public notify: NotificationService
  ) {}

  getDecodedJWT(): decoded {
    const jwt = localStorage.getItem('token') || '';
    return jwtDecode(jwt);
  }

  getUserInfo(): userInfo {
    const decoded: decoded = this.getDecodedJWT();
    return decoded.userInfo;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userInfo = this.getUserInfo();
    const role = userInfo.userRole;

    const requiredRole = next.data['role'];

    if (role === requiredRole) {
      return true;
    }
    this.notify.showNotification('close', '#eb2f96', 'Angku Manga kamari?');
    this.router.navigate([
      this.route.snapshot.queryParams['returnUrl'] || '/dashboard',
    ]);
    return false;
  }
}
