import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {
  visitorData,
  visitorResponse,
} from 'src/app/models/visitor.model';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorManagementService } from 'src/app/shared/service/visitor/visitor-management.service';
import { ViewVisitorComponent } from '../view-visitor/view-visitor.component';

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
    private VisitorManagementService: VisitorManagementService,
    private notification: NotificationService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.fetchRejected();
  }

  handleViewEdit(visitor: visitorData): void {
    console.log(visitor);
    const modal = this.modal.create({
      nzContent: ViewVisitorComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzTitle: 'Visitor Detail',
      nzMaskClosable: false,
      nzClosable: false,
      nzWidth: '55%',
      nzData: { tab: 'funished', visitId: visitor.id }, // Pass the data as a property in an object
    });
    modal.afterClose.subscribe(() => {
      this.handleReload();
    });
  }

  handleReload(): void {
    window.location.reload();
  }

  fetchRejected(): void {
    this.isLoading = true;
    this.VisitorManagementService.getVisitor('Rejected').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.VisitorManagementService.rejectedData = res.data.length;
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
        this.VisitorManagementService.deleteVisitor(visitor.id).subscribe(
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
