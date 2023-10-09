import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  tableData: any[] = [];
  passwordVisible: boolean = false;
  addVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

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
      name: 'Service',
      width: '200px',
    },
    {
      name: 'Address',
      width: '200px',
    },
    {
      name: 'Status',
      width: '200px',
    },
  ];

  addVisibility(value: boolean): void {
    this.addVisible = value;
  }
}
