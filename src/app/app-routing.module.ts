import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ForgetPasswordComponent } from './modules/forget-password/forget-password.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VisitorManagementComponent } from './modules/visitor-management/visitor-management.component';
import { EmployeeManagementComponent } from './modules/employee-management/employee-management.component';
import { CameraManagementComponent } from './modules/camera-management/camera-management.component';
import { ReportComponent } from './modules/report/report.component';
import { VisitCompanyComponent } from './modules/visit-company/visit-company.component';
import { AuthGuardService } from './shared/service/auth/auth-guard.service';
import { RoleGuardService } from './shared/service/auth/role-guard.service';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: '', component: VisitCompanyComponent },
  { path: 'login/forget-password', component: ForgetPasswordComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: SidenavComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'visitor',
        component: VisitorManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      {
        path: 'employee',
        component: EmployeeManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      {
        path: 'camera',
        component: CameraManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      {
        path: 'report',
        component: ReportComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
