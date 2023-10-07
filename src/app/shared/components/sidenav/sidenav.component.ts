import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from '../../service/auth/role-guard.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  userRole: string = '';

  constructor(
    private roleService: RoleGuardService,
    private router: Router,
    private notification: NotificationService
  ) {}
  ngOnInit(): void {
    this.userRole = this.roleService.getUserInfo().user_role;
  }

  logout(): void {
    console.log('logout');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.notification.showNotification('check', '#52c41a', 'Logout Success');
  }
}
