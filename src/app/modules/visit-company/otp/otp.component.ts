import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  asNativeElements,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { newVisitor, otp } from 'src/app/models/visitor-management';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitService } from 'src/app/shared/service/visitor/visit.service';

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
  otpExpiration!: Date;
  remainingTime: string = 'Resend OTP';
  remaining: number = 0;
  errorMessage!: string;

  visitDetail!: newVisitor;

  constructor(
    private router: Router,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private visitService: VisitService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  ngAfterViewInit() {
    this.queryParamsCheck();
    this.timerHandler();
  }

  timerHandler(): void {
    setInterval(() => {
      const now = new Date();
      const timeDifference = this.otpExpiration.getTime() - now.getTime();
      this.remaining = timeDifference;
      if (timeDifference > 0) {
        const minutes = Math.floor(timeDifference / 1000 / 60);
        const seconds = Math.floor((timeDifference / 1000) % 60);
        this.remainingTime = `${this.formatTime(minutes)}:${this.formatTime(
          seconds
        )}`;
      } else {
        this.remainingTime = 'Resend';
      }
    }, 1000);
  }

  private formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  getData(): void {
    const visit_detail = localStorage.getItem('visit_detail');
    if (!visit_detail) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'No Visit Data Provided'
      );
      this.router.navigateByUrl('/');
    }
    this.visitDetail = JSON.parse(visit_detail || '{}');
    // console.log(this.visitDetail);
    this.otpExpiration = new Date(localStorage.getItem('expired_at') || '');

    // console.log(this.otpExpiration);
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
      const payload: otp = {
        otp_code: otp,
        email: this.visitDetail.email,
      };
      this.visitService.verifyOTP(payload).subscribe(
        (r) => {
          this.invalidOTP = false;
          localStorage.setItem('visitToken', r.otpToken);
          this.notification.showNotification('check', '#52c41a', r.message);
          this.router.navigateByUrl('/visit-company/uploads');
        },
        (error) => {
          this.invalidOTP = true;
          this.errorMessage = error.error.message;
          this.notification.showNotification(
            'warning',
            '#eb2f96',
            error.error.message
          );
        }
      );
    }, 1000);
  }

  resendOTP(): void {
    const email = this.visitDetail.email;
    this.visitService.getOTP(email).subscribe(
      (r) => {
        this.notification.showNotification('check', '#52c41a', r.message);
        localStorage.setItem('expired_at', r.expired_at);
        this.timerHandler();
        this.getData();
      },
      (error) => {
        console.log(error.error.message);
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message
        );
      }
    );
  }
}
