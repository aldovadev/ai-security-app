import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCompany, company } from 'src/app/models/company.model';
import { DashboardService } from 'src/app/shared/service/dashboard/dashboard.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

@Component({
  selector: 'app-admin',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  tableData: company[] = [];
  passwordVisible: boolean = false;
  addVisible: boolean = false;

  addCompanyForm: FormGroup;
  isAddLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationService,
    private dashboardService: DashboardService
  ) {
    this.addCompanyForm = this.fb.group({
      companyName: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      serviceId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.fetchCompany();
  }

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

  fetchCompany(): void {
    this.dashboardService.getCompany().subscribe(
      (r) => {
        this.tableData = r.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleAddCompany(): void {
    console.log(this.addCompanyForm);
    if (!this.addCompanyForm.valid) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'Please Fill the Required Field'
      );
      return;
    }

    this.isAddLoading = true;
    this.addVisible = false;
    const payload: AddCompany = {
      companyName: this.addCompanyForm.value.companyName,
      email: this.addCompanyForm.value.email,
      password: this.addCompanyForm.value.password,
      phoneNumber: this.addCompanyForm.value.phoneNumber,
      address: this.addCompanyForm.value.address,
      serviceId: this.addCompanyForm.value.serviceId,
      status: 'active',
      userRole: 'Company',
    };

    this.dashboardService.addCompany(payload).subscribe(
      (r) => {
        this.notification.showNotification('check', '#52c41a', r.message);
        this.isAddLoading = false;
        window.location.reload()
      },
      (error) => {
        console.log(error);
        this.isAddLoading = false;
      }
    );
  }

  addVisibility(value: boolean): void {
    this.addVisible = value;
  }
}
