/* eslint-disable @typescript-eslint/no-explicit-any */
import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { OnlyNumberService } from './shared/directive/only-number.service';

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
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { WebcamModule } from 'ngx-webcam';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { MenuService, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTransferModule } from 'ng-zorro-antd/transfer';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzResizableModule } from 'ng-zorro-antd/resizable';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzNotificationServiceModule } from 'ng-zorro-antd/notification';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { LoginComponent } from './modules/user/login/login.component';
import { ForgetPasswordComponent } from './modules/user/forget-password/forget-password.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { RecognizedCardComponent } from './modules/management/camera-management/recognized-card/recognized-card.component';

import { VisitorManagementComponent } from './modules/management/visitor-management/visitor-management.component';
import { EmployeeManagementComponent } from './modules/management/employee-management/employee-management.component';
import { CameraManagementComponent } from './modules/management/camera-management/camera-management.component';
import { TrackVisitComponent } from './modules/visitor/track-visit/track-visit.component';
import { UserManagementComponent } from './modules/management/user-management/user-management.component';
import { IncomingComponent } from './modules/management/visitor-management/incoming/incoming.component';
import { AcceptedComponent } from './modules/management/visitor-management/accepted/accepted.component';
import { RejectedComponent } from './modules/management/visitor-management/rejected/rejected.component';
import { ReportComponent } from './modules/report/report.component';
import { EmployeeDataComponent } from './modules/management/employee-management/employee-data/employee-data.component';
import { VisitorComponent } from './modules/visitor/visitor.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxScannerQrcodeModule, LOAD_WASM } from 'ngx-scanner-qrcode';

import { AuthGuardService } from './shared/service/auth/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { NotificationService } from './shared/service/notification/notification.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RoleGuardService } from './shared/service/auth/role-guard.service';
import { AuthService } from './shared/service/auth/auth.service';
import { DashboardService } from './shared/service/dashboard/dashboard.service';
import { UploadImagesComponent } from './modules/visitor/upload-images/upload-images.component';
import { OtpComponent } from './modules/visitor/otp/otp.component';
import { VisitorService } from './shared/service/visitor/visitor.service';
import { VisitorManagementService } from './shared/service/visitor/visitor-management.service';
import { OptionService } from './shared/service/option/option.service';
import { FinishedComponent } from './modules/management/visitor-management/finished/finished.component';
import { ViewVisitorComponent } from './modules/management/visitor-management/view-visitor/view-visitor.component';
import * as ApexCharts from 'apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';

import { FaceAutoCaptureComponent } from './shared/components/face-auto-capture/face-auto-capture.component';
import { FaceUiComponent } from './shared/components/face-ui/face-ui.component';
import { FaceCameraComponent } from './shared/components/face-camera/face-camera.component';

LOAD_WASM().subscribe((res: any) => console.log('LOAD_WASM', res));
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CapitalizeWordsPipe,
    LoginComponent,
    ForgetPasswordComponent,
    SidenavComponent,
    VisitorManagementComponent,
    EmployeeManagementComponent,
    CameraManagementComponent,
    UserManagementComponent,
    IncomingComponent,
    AcceptedComponent,
    RejectedComponent,
    ReportComponent,
    EmployeeDataComponent,
    VisitorComponent,
    NotificationComponent,
    OnlyNumberService,
    UploadImagesComponent,
    OtpComponent,
    FinishedComponent,
    ViewVisitorComponent,
    FaceAutoCaptureComponent,
    FaceUiComponent,
    FaceCameraComponent,
    DashboardComponent,
    TrackVisitComponent,
    FaceAutoCaptureComponent,
    FaceUiComponent,
    FaceCameraComponent,
    DashboardComponent,
    RecognizedCardComponent
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
    NzModalModule,
    NzTreeModule,
    NzAlertModule,
    NzDrawerModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzProgressModule,
    NzResultModule,
    NzSkeletonModule,
    NzSpinModule,
    NzAnchorModule,
    NzBackTopModule,
    NzDividerModule,
    NzResizableModule,
    NzImageModule,
    NzNoAnimationModule,
    NzNotificationServiceModule,
    NzTagModule,
    NzTimelineModule,
    NzCalendarModule,
    NzCardModule,
    NzCarouselModule,
    NzCollapseModule,
    NzCommentModule,
    NzDescriptionsModule,
    NzEmptyModule,
    NzListModule,
    NzPopoverModule,
    NzStatisticModule,
    NzInputNumberModule,
    NzMentionModule,
    NzRadioModule,
    NzRateModule,
    NzSliderModule,
    NzSwitchModule,
    NzTimePickerModule,
    NzTransferModule,
    NzTreeSelectModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzStepsModule,
    NzAutocompleteModule,
    NzCascaderModule,
    NzSpaceModule,
    NzAffixModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzGridModule,
    WebcamModule,
    NgApexchartsModule,
    NgxScannerQrcodeModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // },
    AuthGuardService,
    JwtHelperService,
    NotificationService,
    RoleGuardService,
    AuthService,
    DashboardService,
    VisitorService,
    VisitorManagementService,
    OptionService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule { }
