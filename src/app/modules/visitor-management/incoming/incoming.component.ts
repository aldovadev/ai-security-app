import { Component, Input, OnInit } from '@angular/core';
import { visitorInfo } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.scss'],
})
export class IncomingComponent implements OnInit {
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
