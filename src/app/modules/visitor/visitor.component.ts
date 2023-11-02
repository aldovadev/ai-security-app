/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { Router } from '@angular/router';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import * as dayjs from 'dayjs';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { newVisitor } from 'src/app/models/visitor.model';
import { VisitorService } from 'src/app/shared/service/visitor/visitor.service';
import { OptionService } from 'src/app/shared/service/option/option.service';

type response = {
  message: string;
  data: companyOption[];
};

type companyOption = {
  id: number;
  companyName: string;
};

type Data = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  address: string;
  startDate: string;
  endDate: string;
  visitReason: string;
  visitNumber: string;
  originId: string;
  destinationId: string;
  statusId: number;
  photoPath: string;
  updatedAt: string;
  createdAt: string;
};

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss'],
})
export class VisitorComponent implements OnInit {
  visitForm: FormGroup;
  companyList: companyOption[] = [];

  today = new Date();
  startTimeOptions: string[] = [];
  endTimeOptions: string[] = [];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NotificationService,
    private VisitorService: VisitorService,
    private optionService: OptionService,
  ) {
    this.visitForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      companyOrigin: [null, Validators.compose([])],
      companyDestination: ['', Validators.compose([Validators.required])],
      visitReason: ['', Validators.compose([Validators.required])],
      visitDate: ['', Validators.compose([Validators.required])],
      visitTime: ['', Validators.compose([Validators.required])],
      endvisitTime: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.fetchCompanyList();
    this.generateStartTimeOptions();
    this.visitForm.get('endvisitTime')?.disable();
  }

  fetchCompanyList(): void {
    this.optionService.companyOption().subscribe(
      (res: response) => {
        this.companyList = res.data;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  generateStartTimeOptions() {
    const startTime = 7 * 60;
    const endTime = 16 * 60 + 30;
    const interval = 30;

    for (let i = startTime; i <= endTime; i += interval) {
      const hour = Math.floor(i / 60);
      const minute = i % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      this.startTimeOptions.push(formattedTime);
    }
  }

  startDateChange(time: string): void {
    this.visitForm.get('endvisitTime')?.enable();
    this.endTimeOptions = [];
    const selectedStartTime = time;

    const startTime = selectedStartTime.split(':');
    const startHour = parseInt(startTime[0], 10);
    const startMinute = parseInt(startTime[1], 10);
    const endTime = 17 * 60;
    const interval = 30;

    let currentTime = startHour * 60 + startMinute + interval;

    while (currentTime <= endTime) {
      const hour = Math.floor(currentTime / 60);
      const minute = currentTime % 60;
      const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
        .toString()
        .padStart(2, '0')}`;
      this.endTimeOptions.push(formattedTime);
      currentTime += interval;
    }
  }

  disabledDate = (current: Date): boolean => {
    if (this.today.getHours() > 17) {
      return differenceInCalendarDays(current, this.today) <= 1;
    }
    return differenceInCalendarDays(current, this.today) <= 0;
  };

  submit(): void {
    if (!this.visitForm.valid) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'Please fill all field!',
      );
      // return;
    }

    if (!this.validateDate()) return;
    const selectedDate = dayjs(this.visitForm.value.visitDate);
    const startTime = dayjs(
      `${selectedDate.year()}-${selectedDate.month()}-${selectedDate.date()} ${
        this.visitForm.value.visitTime
      }:00`,
    ).toDate();

    const endTime = dayjs(
      `${selectedDate.year()}-${selectedDate.month()}-${selectedDate.date()} ${
        this.visitForm.value.endvisitTime
      }:00`,
    ).toDate();

    const payload: newVisitor = {
      name: `${this.visitForm.value.firstName} ${this.visitForm.value.lastName}`,
      email: this.visitForm.value.email,
      phoneNumber: this.visitForm.value.phoneNumber,
      gender: this.visitForm.value.gender,
      address: this.visitForm.value.address,
      originId: this.visitForm.value.companyOrigin,
      destinationId: this.visitForm.value.companyDestination,
      startDate: startTime.toISOString(),
      endDate: endTime.toISOString(),
      visitReason: this.visitForm.value.visitReason,
    };
    // console.log(payload);

    localStorage.setItem('visit_detail', JSON.stringify(payload));
    if (!localStorage.getItem('visitToken')) {
      this.VisitorService.getOTP(payload.email).subscribe(
        (r) => {
          this.notification.showNotification('check', '#52c41a', r.message);
          localStorage.setItem('visit_detail', JSON.stringify(payload));
          localStorage.setItem('expired_at', r.expiredAt);
          this.router.navigate(['visitor/otp']);
        },
        (error) => {
          console.log(error.error.message);
          this.notification.showNotification(
            'warning',
            '#eb2f96',
            error.error.message,
          );
          // this.router.navigate(['visitor/otp']);
        },
      );
      return;
    }

    this.VisitorService.createVisitor(payload).subscribe(
      (r: { message: string; status: string; data: Data }) => {
        this.notification.showNotification('check', '#52c41a', r.message);
        localStorage.setItem('visitId', r.data.id);
        this.router.navigate(['visitor/uploads']);
      },
      (error) => {
        console.log(error.error.message);
        if (error.error.message === 'You already make a visit request today') {
          this.notification.showNotification(
            'warning',
            '#eb2f96',
            error.error.message,
          );
          return;
        }
        localStorage.setItem('visit_detail', JSON.stringify(payload));
      },
    );
  }

  validateDate(): boolean {
    const date = dayjs(this.visitForm.value.visitDate);
    if (date.day() === 0 || date.day() === 6) {
      this.notification.showNotification(
        'info',
        '#FFFF00',
        'Please visit our company at office hour!',
      );
      return false;
    }

    return true;
  }
}
