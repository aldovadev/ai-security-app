import { Component, Input, OnInit } from '@angular/core';
import { OptionService } from 'src/app/shared/service/option/option.service';

type response = {
  message: string;
  data: companyOption[];
};

type companyOption = {
  id: number;
  companyName: string;
};

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
})
export class EmployeeDataComponent implements OnInit {
  tableData: any[] = [];
  companyList: companyOption[] = [];
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

  modalVisible!: boolean;
  constructor(private optionService: OptionService) {}

  ngOnInit(): void {
    this.fetchCompanyDestination();
  }

  fetchCompanyDestination(): void {
    this.optionService.companyOption().subscribe(
      (res: response) => {
        this.companyList = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
