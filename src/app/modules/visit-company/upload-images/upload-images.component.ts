import { Component, OnInit } from '@angular/core';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss'],
})
export class UploadImagesComponent implements OnInit {
  pictureList: NzUploadFile[] = [];

  constructor() {}

  ngOnInit(): void {}

  handleUpload(item: NzUploadXHRArgs): Subscription {
    // Simulate a POST request to upload the file
    const formData = new FormData();
    formData.append('file', item.file as any);

    // Simulate an HTTP POST request with a delay
    const uploadObservable: Observable<any> = new Observable((observer) => {
      // Simulate an HTTP POST request delay (2 seconds)
      const delayMs = 2000;

      // Simulate a successful response
      setTimeout(() => {
        observer.next({ success: true, message: 'File uploaded successfully' });
        observer.complete();
      }, delayMs);
    });

    // Subscribe to the observable and return the subscription
    return uploadObservable.subscribe(
      (response) => {
        // Handle the response here (e.g., show success message)
        console.log(response.message);
      },
      (error) => {
        // Handle errors here (e.g., show error message)
        console.error('Error uploading file:', error);
      }
    );
  }

  startUpload() {}

  beforeUpload = (
    file: NzUploadFile,
    _fileList: NzUploadFile[]
  ): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const maxSize =
        file.type === 'application/pdf' ? 50 * 1024 * 1024 : 2 * 1024 * 1024;
      const isLt2M = file.size! < maxSize;
      console.log(file.size);
      if (!isLt2M) {
        observer.complete();
        return;
      }
      observer.next(isLt2M);
      observer.complete();
    });

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        // this.loading = true;
        break;
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

  handleDownload = (file: NzUploadFile) => {};
}
