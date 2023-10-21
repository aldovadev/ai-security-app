import { Component, Input, OnInit } from '@angular/core';
import {
  visitorData,
  visitorResponse,
  visitorStatus,
} from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';

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
    private visitorModuleService: VisitorModuleService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchAccepted();
  }

  handleReload(): void {
    window.location.reload();
  }

  fetchAccepted(): void {
    this.isLoading = true;
    this.visitorModuleService.getVisitor('Accepted').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.visitorModuleService.acceptedData = res.data.length;
        this.acceptedData = res.data.length;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
  }

  handleFinish(visitor: visitorData): void {
    let payload: visitorStatus = {
      id: visitor.id,
      visit_status: 'Finished',
    };
    this.visitorModuleService.visitorStatus(payload).subscribe(
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
