import { Component, OnInit } from '@angular/core';
import {
  visitorData,
  visitorResponse,
} from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';

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
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchFinished();
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
