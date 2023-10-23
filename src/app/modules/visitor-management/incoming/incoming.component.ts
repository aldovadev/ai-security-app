import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  visitorData,
  visitorResponse,
  visitorStatus,
} from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';
import { ViewVisitorComponent } from '../view-visitor/view-visitor.component';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.scss'],
})
export class IncomingComponent implements OnInit {
  @Input() dateRange: Date[] = [];

  listOfColumn = [
    {
      name: 'Action',
      width: '150px',
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

  tableData: visitorData[] = [];
  incomingData: number = 0;
  selectedVisitor!: visitorData;

  isLoading!: boolean;
  constructor(
    private visitorModuleService: VisitorModuleService,
    private notification: NotificationService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.fetchIncoming();
    this.autoUpdate();
  }

  autoUpdate(): void {
    setInterval(() => {
      this.fetchIncoming();
    }, 20000);
  }

  fetchIncoming(): void {
    this.isLoading = true;
    this.visitorModuleService.getVisitor('Incoming').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.visitorModuleService.incomingData = res.data.length;
        this.incomingData = res.data.length;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
  }

  handleRefresh(): void {
    window.location.reload();
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
      nzData: { tab: 'incoming', visitId: visitor.id }, // Pass the data as a property in an object
    });
    modal.afterClose.subscribe(() => {
      this.handleRefresh();
    });
  }

  handleAccept(visitor: visitorData): void {
    let payload: visitorStatus = {
      id: visitor.id,
      statusId: this.visitorModuleService.status['Accepted'],
    };
    this.visitorModuleService.visitorStatus(payload).subscribe(
      (res) => {
        this.notification.showNotification('check', '#52c41a', res.message);
        window.location.reload();
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

  handleReject(visitor: visitorData): void {
    let payload: visitorStatus = {
      id: visitor.id,
      statusId: this.visitorModuleService.status['Rejected'],
    };
    this.visitorModuleService.visitorStatus(payload).subscribe(
      (res) => {
        this.notification.showNotification('check', '#52c41a', res.message);
        this.handleRefresh();
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
