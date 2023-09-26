import { Component, Input, OnInit } from '@angular/core';
import { visitorInfo } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-accepted',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss'],
})
export class AcceptedComponent implements OnInit {
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
      width: '80px',
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
