import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { Router } from '@angular/router';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import * as dayjs from 'dayjs';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { newVisitor } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-visit-company',
  templateUrl: './visit-company.component.html',
  styleUrls: ['./visit-company.component.scss'],
})
export class VisitCompanyComponent implements OnInit {
  visitForm: FormGroup;

  today = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notification: NotificationService
  ) {
    this.visitForm = this.fb.group({
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      companyOrigin: ['', Validators.compose([])],
      companyDestination: ['', Validators.compose([Validators.required])],
      visitReason: ['', Validators.compose([Validators.required])],
      visitDate: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {}

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, this.today) <= 0;

  disabledRangeTime: DisabledTimeFn = (_value, type?: DisabledTimePartial) => {
    if (type === 'start') {
      return {
        nzDisabledHours: () => [0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23],
        nzDisabledMinutes: () => [],
        nzDisabledSeconds: () => [],
      };
    }
    return {
      nzDisabledHours: () => [0, 1, 2, 3, 4, 5, 6, 18, 19, 20, 21, 22, 23],
      nzDisabledMinutes: () => [],
      nzDisabledSeconds: () => [],
    };
  };

  submit(): void {
    if (!this.visitForm.valid) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'Please fill all field!'
      );
      // return;
    }

    if (!this.validateDate()) return;

    const payload: newVisitor = {
      name: `${this.visitForm.value.firstName} ${this.visitForm.value.lastName}`,
      email: this.visitForm.value.email,
      phone_number: this.visitForm.value.phoneNumber,
      gender: this.visitForm.value.gender,
      address: this.visitForm.value.address,
      company_origin: this.visitForm.value.companyOrigin,
      company_destination: this.visitForm.value.companyDestination,
      start_date: this.visitForm.value.visitDate[0],
      end_date: this.visitForm.value.visitDate[1],
      visit_reason: this.visitForm.value.visitReason,
    };

    console.log(payload);

    this.router.navigate(['visit-company/otp']);
  }

  validateDate(): boolean {
    const startDate = dayjs(this.visitForm.value.visitDate[0]);
    const endDate = dayjs(this.visitForm.value.visitDate[1]);

    if (
      startDate.day() === 0 ||
      startDate.day() === 6 ||
      endDate.day() === 0 ||
      endDate.day() === 6
    ) {
      this.notification.showNotification(
        'info',
        '#FFFF00',
        'Please visit our company at office hour!'
      );

      return false;
    }

    const visitHour = endDate.diff(startDate, 'hour');
    const visitMs = endDate.diff(startDate, 'millisecond');
    if (visitMs <= 0) {
      this.notification.showNotification(
        'info',
        '#FFFF00',
        'Please input a valid hour'
      );

      return false;
    }

    if (visitHour > 12) {
      this.notification.showNotification(
        'info',
        '#FFFF00',
        `WHAT THE F*CK WHY YOU VISIT US ${visitHour} HOUR?`
      );

      return false;
    }
    return true;
  }
}
