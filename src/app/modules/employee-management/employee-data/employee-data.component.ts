import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
})
export class EmployeeDataComponent implements OnInit {
  @Input() dateRange: Date[] = [];

  tableData: any[] = [];

  listOfColumn = [
    {
      name: 'Action',
      width: '120px',
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
      name: 'ID Number',
      width: '200px',
    },
    {
      name: 'Postion',
      width: '200px',
    },
  ];

  ngOnInit(): void {}
}
