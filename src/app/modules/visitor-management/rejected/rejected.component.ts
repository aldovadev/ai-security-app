import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  visitorData,
  visitorResponse,
} from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss'],
})
export class RejectedComponent implements OnInit {
  @Input() dateRange: Date[] = [];

  tableData: visitorData[] = [];
  rejectedData: number = 0;

  listOfColumn = [
    {
      name: 'Action',
      width: '110px',
    },
    {
      name: 'Name',
      width: '200px',
    },
    {
      name: 'Email',
      width: '200px',
    },
    {
      name: 'Phone Number',
      width: '200px',
    },
    {
      name: 'Visit Date',
      width: '200px',
    },
    {
      name: 'Visit Reason',
      width: '200px',
    },
  ];

  isLoading!: boolean;
  confirmModal?: NzModalRef;
  constructor(
    private visitorModuleService: VisitorModuleService,
    private notification: NotificationService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.fetchRejected();
  }

  handleReload(): void {
    window.location.reload();
  }

  fetchRejected(): void {
    this.isLoading = true;
    this.visitorModuleService.getVisitor('Rejected').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.visitorModuleService.rejectedData = res.data.length;
        this.rejectedData = res.data.length;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
  }

  handleDelete(visitor: visitorData): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent:
        'When clicked the OK button, these item will removed and you never see it again!',
      nzOnOk: () => {
        this.visitorModuleService.deleteVisitor(visitor.id).subscribe(
          (res) => {
            this.notification.showNotification('check', '#52c41a', res.message);
            this.handleReload();
          },
          (error) => {
            this.notification.showNotification(
              'warning',
              '#eb2f96',
              error.error.message
            );
          }
        );
      },
    });
  }
}
