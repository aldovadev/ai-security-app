import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewEmployee, employeeList } from 'src/app/models/employee.model';
import { RoleGuardService } from 'src/app/shared/service/auth/role-guard.service';
import { EmployeeService } from 'src/app/shared/service/employee/employee.service';
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
  tableData: employeeList[] = [];
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
      name: 'Id',
      width: '200px',
    },
    {
      name: 'Postion',
      width: '200px',
    },
  ];

  modalVisible!: boolean;
  employeeForm: FormGroup;
  constructor(
    private employeeService: EmployeeService,
    private roleGuardService: RoleGuardService,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      position: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      employeeId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    // console.log(this.roleGuardService.getUserInfo().id);
    this.fetchEmployee();
  }

  fetchEmployee(): void {
    this.employeeService
      .getEmployee(this.roleGuardService.getUserInfo().id)
      .subscribe(
        (r: { message: string; company: string; data: employeeList[] }) => {
          // console.log(r);
          this.tableData = r.data;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  confirmAddEmployee(): void {
    if (!this.employeeForm.valid) return;
    const payload: NewEmployee = {
      name: this.employeeForm.value.name,
      email: this.employeeForm.value.email,
      phoneNumber: this.employeeForm.value.phoneNumber,
      gender: this.employeeForm.value.gender,
      position: this.employeeForm.value.position,
      address: this.employeeForm.value.address,
      employeeId: this.employeeForm.value.employeeId,
      companyId: this.roleGuardService.getUserInfo().id,
    };

    console.log(payload);
  }
}
