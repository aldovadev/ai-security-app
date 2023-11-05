/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadXHRArgs, NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NewEmployee, employeeData } from 'src/app/models/employee.model';
import { RoleGuardService } from 'src/app/shared/service/auth/role-guard.service';
import { EmployeeService } from 'src/app/shared/service/employee/employee.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

type addEmployeeData = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  position: string;
  address: string;
  companyId: string;
  employeeId: string;
  photoPath: string;
  updatedAt: string;
  createdAt: string;
};

@Component({
  selector: 'app-employee-data',
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss'],
})
export class EmployeeDataComponent implements OnInit {
  tableData: employeeData[] = [];
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
      name: 'Position',
      width: '200px',
    },
  ];

  isAddLoading!: boolean;
  modalVisible!: boolean;
  employeeForm: FormGroup;
  profileForm: FormGroup;
  pictureList: NzUploadFile[] = [];
  confirmModal?: NzModalRef;

  editModalVisible!: boolean;
  isEditConfirm!: boolean;
  isEditLoading!: boolean;
  selectedEmployee!: employeeData;
  constructor(
    private employeeService: EmployeeService,
    private roleGuardService: RoleGuardService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private notification: NotificationService,
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

    this.profileForm = this.fb.group({
      name: [''],
      email: [''],
      phoneNumber: [null],
      gender: [''],
      position: [''],
      address: [''],
      employeeId: [''],
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
        (r: { message: string; company: string; data: employeeData[] }) => {
          this.tableData = r.data;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  handleEdit(employee: employeeData): void {
    this.editModalVisible = true;
    this.isEditLoading = true;
    this.selectedEmployee = employee;
    this.employeeService.getEmployeeProfile(employee.id).subscribe(
      (res: { message: string; data: employeeData; url: string }) => {
        this.isEditLoading = false;
        this.pictureList = [
          {
            uid: '0',
            name: 'image.png',
            status: 'done',
            url: res.url,
          },
        ];
        this.profileForm.get('name')?.setValue(res.data.name);
        this.profileForm.get('email')?.setValue(res.data.email);
        this.profileForm.get('phoneNumber')?.setValue(res.data.phoneNumber);
        this.profileForm.get('gender')?.setValue(res.data.gender);
        this.profileForm.get('position')?.setValue(res.data.position);
        this.profileForm.get('address')?.setValue(res.data.address);
        this.profileForm.get('employeeId')?.setValue(res.data.employeeId);
      },
      (error) => {
        console.log(error);
      },
    );
  }

  confirmEdit(): void {
    this.isEditConfirm = true;
    const payload: NewEmployee = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      phoneNumber: this.profileForm.value.phoneNumber,
      gender: this.profileForm.value.gender,
      position: this.profileForm.value.position,
      address: this.profileForm.value.address,
      employeeId: this.profileForm.value.employeeId,
      companyId: this.roleGuardService.getUserInfo().id,
    };

    this.employeeService
      .editEmployee(this.selectedEmployee.id, payload)
      .subscribe(
        (res: { message: string; status: string; data: employeeData[] }) => {
          this.isEditConfirm = false;
          this.editModalVisible = false;
          this.notification.showNotification('check', '#52c41a', res.message);
        },
        (error) => {
          this.isEditConfirm = false;
          this.notification.showNotification(
            'warning',
            '#eb2f96',
            error.error.message,
          );
        },
      );
  }

  handleDelete(employee: employeeData): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent:
        'When clicked the OK button, these item will removed and you never see it again!',
      nzOnOk: () => {
        this.employeeService.deleteEmployee(employee.id).subscribe(
          (res: { message: string; status: string }) => {
            this.notification.showNotification('check', '#52c41a', res.message);
            window.location.reload();
          },
          (error) => {
            this.notification.showNotification(
              'warning',
              '#eb2f96',
              error.error.message,
            );
          },
        );
      },
    });
  }

  confirmAddEmployee(): void {
    if (!this.employeeForm.valid) return;
    this.isAddLoading = true;
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

    this.employeeService.createEmployee(payload).subscribe(
      (res: { message: string; status: string; data: addEmployeeData }) => {
        this.isAddLoading = false;
        this.notification.showNotification('check', '#52c41a', res.message);
        if (res.data.id) {
          this.uploadImage(res.data.id);
        }
        // window.location.reload()
      },
      (error) => {
        this.isAddLoading = false;
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.error.error,
        );
      },
    );
  }

  uploadImage(employeeId: string): void {
    if (!employeeId) return;
    const formData = new FormData();
    formData.append('image', this.pictureList[0] as any);
    this.employeeService.uploadImage(employeeId, formData).subscribe(
      (res: {
        message: string;
        status: string;
        url: string;
        detail: {
          message: string;
          name: string;
          status: number;
        };

      }) => {
        this.notification.showNotification('check', '#52c41a', res.message);
        this.modalVisible = false;
      },
      (error) => {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message,
        );
      },
    );
  }

  customUpload = (item: NzUploadXHRArgs): Subscription => {
    return new Observable((observer) => {
      const formData = new FormData();
      formData.append('image', item.file as any);

      this.employeeService
        .uploadImage(this.selectedEmployee.id, formData)
        .subscribe(
          (res: {
            message: string;
            status: string;
            url: string;
            detail: {
              message: string;
              name: string;
              status: number;
            };

          }) => {
            this.notification.showNotification('check', '#52c41a', res.message);
            this.modalVisible = false;
            this.pictureList = [];
            this.handleEdit(this.selectedEmployee);
            window.location.reload();
            observer.next();
            observer.complete();
          },
          (error) => {
            this.notification.showNotification(
              'warning',
              '#eb2f96',
              error.error.message,
            );
            observer.error(error);
          },
        );
    }).subscribe();
  };

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const maxSize =
        file.type === 'application/pdf' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
      const isLt2M = file.size! < maxSize;
      console.log(file.size);
      if (!isLt2M) {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          'File too large',
        );
        observer.complete();
        return;
      }
      this.pictureList.push(file);
      observer.next(isLt2M);
      observer.complete();
    });
}
