import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  @ViewChild('toaster', { static: true }) toasterTemplate:
    | TemplateRef<{}>
    | any;

  toasterIcon: string = '';
  toasterColor: string = '';
  toasterMessage: string = '';

  constructor(private notification: NzNotificationService) {}
  ngOnInit(): void {}

  createBasicNotification(): void {
    this.notification.template(this.toasterTemplate, {
      nzPlacement: 'topRight',
      nzDuration: 1000,
    });
  }
}
