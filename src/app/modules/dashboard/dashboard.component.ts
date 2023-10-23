import { Component, OnInit } from '@angular/core';
import { RoleGuardService } from 'src/app/shared/service/auth/role-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private roleService: RoleGuardService) {}
  role: string = '';
  ngOnInit(): void {
    this.role = this.roleService.getUserInfo().userRole;
  }
}
