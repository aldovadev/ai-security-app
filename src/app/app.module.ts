import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { NgProgressRouterModule } from 'ngx-progressbar/router';

import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CapitalizeWordsPipe } from './shared/pipes/capitalize-word.pipe';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './modules/login/login.component';
import { ForgetPasswordComponent } from './modules/forget-password/forget-password.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { VisitorManagementComponent } from './modules/visitor-management/visitor-management.component';
import { EmployeeManagementComponent } from './modules/employee-management/employee-management.component';
import { CameraManagementComponent } from './modules/camera-management/camera-management.component';
import { IncomingComponent } from './modules/visitor-management/incoming/incoming.component';
import { AcceptedComponent } from './modules/visitor-management/accepted/accepted.component';
import { RejectedComponent } from './modules/visitor-management/rejected/rejected.component';
import { ReportComponent } from './modules/report/report.component';
import { EmployeeDataComponent } from './modules/employee-management/employee-data/employee-data.component';
import { VisitCompanyComponent } from './modules/visit-company/visit-company.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import { AuthGuardService } from './shared/service/auth/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './shared/service/notification/notification.service';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CapitalizeWordsPipe,
    LoginComponent,
    ForgetPasswordComponent,
    SidenavComponent,
    DashboardComponent,
    VisitorManagementComponent,
    EmployeeManagementComponent,
    CameraManagementComponent,
    IncomingComponent,
    AcceptedComponent,
    RejectedComponent,
    ReportComponent,
    EmployeeDataComponent,
    VisitCompanyComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgbModule,
    FormsModule,
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzTabsModule,
    NzAvatarModule,
    NzBadgeModule,
    NzDatePickerModule,
    NzTableModule,
    NzToolTipModule,
    NzSelectModule,
    NzNotificationModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    AuthGuardService,
    JwtHelperService,
    NotificationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
