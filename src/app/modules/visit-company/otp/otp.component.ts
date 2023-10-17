import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  asNativeElements,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent implements OnInit {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  invalidOTP: boolean = false;
  isLoading!: boolean;
  otp: string[] = [];
  constructor(
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.queryParamsCheck();
  }

  queryParamsCheck(): void {
    const otp = this.route.snapshot.queryParams['otp'];
    if (!otp) return;
    const splitOTP: string[] = otp.split('');
    splitOTP.map((item, index) => {
      this.otpInputs.toArray()[index].nativeElement.value = item;
    });

    this.otp = otp.split('');
    this.validateOTP();
  }

  onInput(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.otp[index] = value;

    if (this.otp.length === 6) {
      this.validateOTP();
    }

    if (value.length === 0) {
      this.invalidOTP = false;
      // If a character is deleted, move to the previous input and remove it from this.otp.
      if (index > 0) {
        setTimeout(() => {
          this.otpInputs.toArray()[index - 1].nativeElement.focus();
          this.otp.pop();
        }, 100);
      }
    } else if (index < 5) {
      // If a character is entered and not at the last input field, move to the next input field.
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  validateOTP(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
      let otp = this.otp.join('');
      if (otp !== '123456') {
        this.invalidOTP = true;
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          'Invalid OTP!'
        );
      } else {
        this.invalidOTP = false;
        this.router.navigateByUrl('/visit-company/uploads');
      }
    }, 1000);
  }
}
