import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import {
  visitorData,
  visitorResponse,
} from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';
import { ViewVisitorComponent } from '../view-visitor/view-visitor.component';

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.scss'],
})
export class FinishedComponent implements OnInit {
  tableData: visitorData[] = [];
  finishedData: number = 0;

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
    private notification: NotificationService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.fetchFinished();
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

  fetchFinished(): void {
    this.isLoading = true;
    this.visitorModuleService.getVisitor('Finished').subscribe(
      (res: visitorResponse) => {
        this.tableData = res.data;
        this.isLoading = false;
        this.finishedData = res.data.length;
      },
      (err) => {
        console.log(err.error.message);
        this.isLoading = false;
      }
    );
  }

  handleReload(): void {
    window.location.reload();
  }
}
