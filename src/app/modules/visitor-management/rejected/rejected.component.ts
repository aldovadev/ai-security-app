import { Component, OnInit, Input } from '@angular/core';
import { visitorInfo } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.scss'],
})
export class RejectedComponent implements OnInit {
  @Input() dateRange: Date[] = [];

  tableData: visitorInfo[] = [
    {
      name: 'uwak chan~',
      email: 'email@email.com',
      phone_number: '081234567890',
      visit_date: '20/09/2023',
      visit_reason: 'manjanguak anak',
    },
  ];

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

  ngOnInit(): void {}
}
