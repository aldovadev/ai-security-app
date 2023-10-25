import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/user/login/login.component';
import { ForgetPasswordComponent } from './modules/user/forget-password/forget-password.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VisitorManagementComponent } from './modules/management/visitor-management/visitor-management.component';
import { EmployeeManagementComponent } from './modules/management/employee-management/employee-management.component';
import { CameraManagementComponent } from './modules/management/camera-management/camera-management.component';
import { ReportComponent } from './modules/report/report.component';
import { VisitorComponent } from './modules/visitor/visitor.component';
import { AuthGuardService } from './shared/service/auth/auth-guard.service';
import { RoleGuardService } from './shared/service/auth/role-guard.service';
import { OtpComponent } from './modules/visitor/otp/otp.component';
import { UploadImagesComponent } from './modules/visitor/upload-images/upload-images.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'visitor', component: VisitorComponent },
  { path: 'visitor/otp', component: OtpComponent },
  { path: 'visitor/uploads', component: UploadImagesComponent },
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
        path: 'visitor-management',
        component: VisitorManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      {
        path: 'employee-management',
        component: EmployeeManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      {
        path: 'camera-management',
        component: CameraManagementComponent,
        data: { role: 'Company' },
        canActivate: [RoleGuardService],
      },
      // {
      //   path: 'report',
      //   component: ReportComponent,
      //   data: { role: 'Company' },
      //   canActivate: [RoleGuardService],
      // },
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
