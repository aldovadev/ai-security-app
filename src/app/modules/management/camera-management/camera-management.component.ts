/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ViewChild } from '@angular/core';
import { OnPhotoTakenEventValue } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { recognizeService } from 'src/app/shared/service/recognize/recognize.service';
import {
  ScannerQRCodeConfig,
  ScannerQRCodeResult,
  NgxScannerQrcodeComponent,
} from 'ngx-scanner-qrcode';
import { recognizedData, employeeResponse, visitorResponse } from 'src/app/models/recognize.model';
import { Observable } from 'rxjs';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

enum Icon {
  SUCCESS = "check-circle",
  FAILED = "close-circle",
  STANDBY = "question-circle"
}

enum Color {
  SUCCESS = "green",
  FAILED = "red",
  STANDBY = "blue"
}

enum Status {
  SUCCESS = "Success",
  FAILED = "Unknown",
  STANDBY = "Standby"
}

@Component({
  selector: 'app-camera-management',
  templateUrl: './camera-management.component.html',
  styleUrls: ['./camera-management.component.scss'],
})


export class CameraManagementComponent implements OnInit {
  @ViewChild('action') action!: NgxScannerQrcodeComponent;

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  faceState: boolean = true
  qrState: boolean = false
  activeTab: number = 0;
  isLoading: boolean = false
  isProcessing: boolean = false
  now !: Date

  recognizeData!: recognizedData;
  visitorResponse!: visitorResponse;
  employeeResponse!: employeeResponse;

  constructor(
    private notification: NotificationService,
    private route: ActivatedRoute,
    private recognizeService: recognizeService,
    private router: Router) {
  }

  async ngOnInit() {
    this.now = new Date
    this.recognizeData = {
      id: "",
      name: "-",
      gender: "",
      type: "-",
      origin: "",
      destination: "",
      date: this.now.toISOString(),
      duration: "00:00:00",
      url: "../../../../assets/img/avatar.jpg",
      color: Color.STANDBY,
      status: Status.STANDBY,
      icon: Icon.STANDBY
    };

    const savedData = localStorage.getItem('recognizeData');
    if (savedData) {
      this.recognizeData = JSON.parse(savedData);
    }

    this.isLoading = true
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 0;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 200);
  }


  public async onEvent(e: ScannerQRCodeResult[]) {
    let resultData: recognizedData
    this.isProcessing = true
    await this.action.stop()
    this.now = new Date
    this.recognizeService.recognizeQR(e[0].value).subscribe(
      (res) => {
        this.notification.showNotification('check', '#52c41a', res.message);
        if (res.type === 'employee') {
          this.employeeResponse = res
          resultData = {
            id: this.employeeResponse.data.employeeId,
            name: this.employeeResponse.data.name,
            gender: this.employeeResponse.data.gender,
            type: this.employeeResponse.type,
            origin: this.employeeResponse.data.company.companyName,
            destination: "-",
            date: this.now.toISOString(),
            duration: "00:00:00",
            url: this.employeeResponse.url,
            color: Color.SUCCESS,
            status: Status.SUCCESS,
            icon: Icon.SUCCESS
          };
        }
        if (res.type === 'visitor') {
          this.visitorResponse = res
          resultData = {
            id: this.visitorResponse.data.visitNumber,
            name: this.visitorResponse.data.name,
            gender: this.visitorResponse.data.gender,
            type: this.visitorResponse.type,
            origin: this.visitorResponse.data.origin.companyName,
            destination: this.visitorResponse.data.destination.companyName,
            date: this.visitorResponse.data.startDate,
            duration: this.calculateDuration(this.visitorResponse.data.startDate, this.visitorResponse.data.endDate),
            url: this.visitorResponse.url,
            color: Color.SUCCESS,
            status: Status.SUCCESS,
            icon: Icon.SUCCESS
          };
        }
        this.action.start()
        setTimeout(() => {
          this.recognizeData = resultData
          this.isProcessing = false;
          localStorage.setItem('recognizeData', JSON.stringify(this.recognizeData));
        }, 2000);

      },
      (error) => {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message,
        );
        resultData = {
          id: "Unknown",
          name: "Unknown",
          gender: "Unknown",
          type: "Unknown",
          origin: "Unknown",
          destination: "Unknown",
          date: this.now.toISOString(),
          duration: "00:00:00",
          url: "../../../../assets/img/avatar.jpg",
          color: Color.FAILED,
          status: Status.FAILED,
          icon: Icon.FAILED
        };
        this.action.start()
        setTimeout(() => {
          this.recognizeData = resultData
          this.isProcessing = false;
          localStorage.setItem('recognizeData', JSON.stringify(this.recognizeData));
        }, 2000);
      }
    );
  }


  handleError(error: Error) {
    console.log(error);
  }

  handlePhotoTaken<T>({ imageData, content }: OnPhotoTakenEventValue<T>) {
    let resultData: recognizedData
    this.isProcessing = true
    this.now = new Date
    this.convertImageToFormData(imageData.image).subscribe(
      (res) => {
        this.notification.showNotification('check', '#52c41a', res.message);
        if (res.type === 'employee') {
          this.employeeResponse = res
          resultData = {
            id: this.employeeResponse.data.employeeId,
            name: this.employeeResponse.data.name,
            gender: this.employeeResponse.data.gender,
            type: this.employeeResponse.type,
            origin: this.employeeResponse.data.company.companyName,
            destination: "-",
            date: this.now.toISOString(),
            duration: "00:00:00",
            url: this.employeeResponse.url,
            color: Color.SUCCESS,
            status: Status.SUCCESS,
            icon: Icon.SUCCESS
          };
        }
        if (res.type === 'visitor') {
          this.visitorResponse = res
          resultData = {
            id: this.visitorResponse.data.visitNumber,
            name: this.visitorResponse.data.name,
            gender: this.visitorResponse.data.gender,
            type: this.visitorResponse.type,
            origin: this.visitorResponse.data.origin.companyName,
            destination: this.visitorResponse.data.destination.companyName,
            date: this.visitorResponse.data.startDate,
            duration: this.calculateDuration(this.visitorResponse.data.startDate, this.visitorResponse.data.endDate),
            url: this.visitorResponse.url,
            color: Color.SUCCESS,
            status: Status.SUCCESS,
            icon: Icon.SUCCESS
          };
        }
        localStorage.setItem('recognizeData', JSON.stringify(resultData));
        window.location.reload()
      },
      (error) => {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message,
        );
        resultData = {
          id: "Unknown",
          name: "Unknown",
          gender: "Unknown",
          type: "Unknown",
          origin: "Unknown",
          destination: "Unknown",
          date: this.now.toISOString(),
          duration: "00:00:00",
          url: "../../../../assets/img/avatar.jpg",
          color: Color.FAILED,
          status: Status.FAILED,
          icon: Icon.FAILED
        };
        localStorage.setItem('recognizeData', JSON.stringify(resultData));
        window.location.reload()
      }
    );
  }

  convertImageToFormData(imageData: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageData);

    return this.recognizeService.recognizeImage(formData);
  }


  calculateDuration(start: string, end: string): string {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const durationMs = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  async onTabClick(tabIndex: number) {
    this.isLoading = true
    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabIndex },
      queryParamsHandling: 'merge',
    });
    if (tabIndex === 1) { await this.action.start(); }
    else await this.action.stop()

    if (tabIndex === 0) {
      setTimeout(() => {
        window.location.reload()
      }, 200);
    }

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
