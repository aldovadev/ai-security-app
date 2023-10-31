/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorService } from 'src/app/shared/service/visitor/visitor.service';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  pictureList: NzUploadFile[] = [];

  constructor(
    private router: Router,
    private notification: NotificationService,
    private VisitorService: VisitorService
  ) { }

  ngOnInit(): void {
    const visit_otp = localStorage.getItem('visitToken');
    const visitorId = localStorage.getItem('visitId');
    if (!visit_otp || !visitorId) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'Not Authorized'
      );
      this.router.navigateByUrl('/');
    }
  }

  handleUpload = (item: NzUploadXHRArgs): Subscription => {
    const formData = new FormData();
    formData.append('image', item.file as any);

    // Call your service's uploadPicture method
    const visitId = localStorage.getItem('visitId') || '';

    const uploadObservable: Observable<any> = this.VisitorService.uploadPicture(
      formData,
      visitId
    );

    // Subscribe to the observable and return the subscription
    return uploadObservable.subscribe(
      (response) => {
        this.notification.showNotification(
          'check',
          '#52c41a',
          response.message
        );
        // Handle the response here (e.g., show success message)
        console.log(response.message);
      },
      (error) => {
        // Handle errors here (e.g., show error message)
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message
        );
        console.error('Error uploading file:', error);
      }
    );
  };

  startUpload() {
    const formData = new FormData();
    formData.append('image', this.pictureList[0] as any);

    // Call your service's uploadPicture method
    const visitId = localStorage.getItem('visitId');
    if (!visitId) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'No Visitor Id Provided'
      );
      this.router.navigateByUrl('/');
      return;
    }
    this.VisitorService.uploadPicture(formData, visitId).subscribe(
      (r) => {
        this.notification.showNotification('check', '#52c41a', r.message);
        this.router.navigateByUrl('/');
      },
      (error) => {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message
        );
      }
    );
  }

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const maxSize =
        file.type === 'application/pdf' ? 50 * 1024 * 1024 : 2 * 1024 * 1024;
      const isLt2M = file.size! < maxSize;
      console.log(file.size);
      if (!isLt2M) {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          'File too large'
        );
        observer.complete();
        return;
      }
      this.pictureList.push(file);
      observer.next(isLt2M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'done':
        console.log(info.file.response);

        break;
      case 'error':
        // this.msg.error('Network error');
        // this.loading = false;
        break;
    }
  }

  getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file['preview']) {
      file['preview'] = await this.getBase64(file.originFileObj!);
    }
    // this.previewImage = file.url || file.preview;
    // this.previewVisible = true;
  };

  handleRemove(file: NzUploadFile): boolean | Observable<boolean> {
    // Your logic to determine whether the file can be removed or not
    if (true) {
      // Return true or an observable that emits true to allow removal
      return true;
    } else {
      // Return false or an observable that emits false to prevent removal
      return false;
    }
  }

  handleDownload = (file: NzUploadFile) => { };
}
