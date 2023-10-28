import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalVisible!: boolean;
  confirmLoading!: boolean;
  trackingForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notification: NotificationService
  ) {
    this.trackingForm = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {}

  confirmModal(): void {
    if (!this.trackingForm.valid) {
      this.notification.showNotification(
        'warning',
        '#eb2f96',
        'Please Fill Required Field'
      );
      return;
    }
    this.confirmLoading = true;
    setTimeout(() => {
      this.confirmLoading = false;
      this.router.navigate(['tracking'], {
        state: { id: this.trackingForm.value.id },
      });
    }, 500);
  }

  closeModal(): void {
    this.modalVisible = false;
  }
}
