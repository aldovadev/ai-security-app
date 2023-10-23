import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from '../../service/auth/role-guard.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../service/notification/notification.service';
import { VisitorModuleService } from '../../service/visitor/visitor-module.service';
import { visitorResponse } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  userRole: string = '';
  incomingData!: number;

  constructor(
    private roleService: RoleGuardService,
    private router: Router,
    private notification: NotificationService,
    private visitorModuleService: VisitorModuleService
  ) {}
  ngOnInit(): void {
    this.userRole = this.roleService.getUserInfo().userRole;
    this.checkVisitor();
  }

  checkVisitor(): void {
    setInterval(() => {
      this.visitorModuleService.getVisitor('Incoming').subscribe(
        (res: visitorResponse) => {
          this.visitorModuleService.incomingData = res.data.length;
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
