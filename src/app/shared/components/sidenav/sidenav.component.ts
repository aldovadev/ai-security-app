import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from '../../service/auth/role-guard.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';
import { VisitorManagementService } from '../../service/visitor/visitor-management.service';
import { visitorResponse } from 'src/app/models/visitor.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  userRole: string = '';
  email: string = '';
  incomingData!: number;
  isCollapsed = false;

  constructor(
    private roleService: RoleGuardService,
    private router: Router,
    private notification: NotificationService,
    private visitorManagementService: VisitorManagementService
  ) { }
  ngOnInit(): void {
    this.userRole = this.roleService.getUserInfo().userRole;
    this.email = this.roleService.getUserInfo().email;
    this.checkVisitor();
  }

  checkVisitor(): void {
    setInterval(() => {
      this.visitorManagementService.getVisitor('Incoming').subscribe(
        (res: visitorResponse) => {
          this.visitorManagementService.incomingData = res.data.length;
          this.incomingData = res.data.length;
        },
        (err) => {
          console.log(err);
        }
      );
    }, 20000);
  }

  logout(): void {
    console.log('logout');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.notification.showNotification('check', '#52c41a', 'Logout Success');
  }
}
