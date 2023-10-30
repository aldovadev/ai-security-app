/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { NewEmployee, employeeList } from 'src/app/models/employee.model';
import { RoleGuardService } from 'src/app/shared/service/auth/role-guard.service';
import { EmployeeService } from 'src/app/shared/service/employee/employee.service';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { OptionService } from 'src/app/shared/service/option/option.service';

type response = {
  message: string;
  data: companyOption[];
};

type companyOption = {
  id: number;
  companyName: string;
};

type addEmployeeData = {
  id: string
  name: string
  email: string
  phoneNumber: string
  gender: string
  position: string
  address: string
  companyId: string
  employeeId: string
  photoPath: string
  updatedAt: string
  createdAt: string
}

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

  isAddLoading!:boolean
  modalVisible!: boolean;
  employeeForm: FormGroup;
   pictureList: NzUploadFile[] = [];
   confirmModal?: NzModalRef;
  constructor(
    private employeeService: EmployeeService,
    private roleGuardService: RoleGuardService,
    private fb: FormBuilder,
    private modal: NzModalService,
     private notification: NotificationService
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

  handleDelete(employee:employeeList):void{
     this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent:
        'When clicked the OK button, these item will removed and you never see it again!',
      nzOnOk: () => {
    this.employeeService.deleteEmployee(employee.id).subscribe(
      (res:{message:string,status:string})=>{
        this.notification.showNotification('check', '#52c41a', res.message);
        window.location.reload()
      },
      error =>{
  this.notification.showNotification('warning',
          '#eb2f96', error.error.message);
}
    )
  }
})}
  

  confirmAddEmployee(): void {
    if (!this.employeeForm.valid) return;
    this.isAddLoading = true
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
      (res:{
        message:string,
        status:string,
        data:addEmployeeData
      })=>{
        this.isAddLoading = false
        this.notification.showNotification('check', '#52c41a', res.message);
        if(res.data.id){
          this.uploadImage(res.data.id)
        }
      // window.location.reload()
      },
      error=>{
        this.isAddLoading = false
        console.log(error)
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.error.error
        );
      }
    )
  }

  uploadImage(employeeId:string):void {
    if(!employeeId)return
     const formData = new FormData();
    formData.append('image', this.pictureList[0] as any);
    this.employeeService.uploadImage(employeeId,formData).subscribe(
      (res:{
  message: string
  status: string
  url: string
  detail: {
  message: string
  name: string
  status: number
}
})=>{
  this.notification.showNotification('check', '#52c41a', res.message);
  this.modalVisible = false
  window.location.reload()
},
error =>{
  this.notification.showNotification('warning',
          '#eb2f96', error.error.message);
}
    )
  }

  beforeUpload = (file: NzUploadFile): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const maxSize =
        file.type === 'application/pdf' ? 50 * 1024 * 1024 : 2 * 1024 * 1024;
      const isLt2M = file.size! < maxSize;
      console.log(file.size);
      if (!isLt2M) {
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          'File too large'
        );
        observer.complete();
        return;
      }
      this.pictureList.push(file);
      observer.next(isLt2M);
      observer.complete();
    });
}
