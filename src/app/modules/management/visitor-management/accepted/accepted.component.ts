import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  visitorData,
  visitorResponse,
  visitorStatus,
} from 'src/app/models/visitor.model';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorManagementService } from 'src/app/shared/service/visitor/visitor-management.service';
import { ViewVisitorComponent } from '../view-visitor/view-visitor.component';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
})
export class AcceptedComponent implements OnInit {
  @Input() dateRange: Date[] = [];

  tableData: visitorData[] = [];
  acceptedData: number = 0;

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

  constructor(
    private VisitorManagementService: VisitorManagementService,
    private notification: NotificationService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    this.fetchAccepted();
  }

  handleReload(): void {
    window.location.reload();
  }

  fetchAccepted(): void {
    this.isLoading = true;
    this.VisitorManagementService.getVisitor('Accepted').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.VisitorManagementService.acceptedData = res.data.length;
        this.acceptedData = res.data.length;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
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
      nzData: { tab: 'accepted', visitId: visitor.id }, // Pass the data as a property in an object
    });
    modal.afterClose.subscribe(() => {
      this.handleReload();
    });
  }

  handleFinish(visitor: visitorData): void {
    let payload: visitorStatus = {
      id: visitor.id,
      statusId: this.VisitorManagementService.status['Finished'],
    };
    this.VisitorManagementService.visitorStatus(payload).subscribe(
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
  }
}
