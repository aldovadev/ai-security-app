import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { Router } from '@angular/router';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-visit-company',
  templateUrl: './visit-company.component.html',
  styleUrls: ['./visit-company.component.scss'],
})
export class VisitCompanyComponent implements OnInit {
  visitForm: FormGroup;

  today = new Date();

  constructor(private fb: FormBuilder, private router: Router) {
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
}
