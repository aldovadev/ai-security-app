import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { trackingVisit } from 'src/app/models/visitor.model';
import { NotificationService } from 'src/app/shared/service/notification/notification.service';
import { VisitorService } from 'src/app/shared/service/visitor/visitor.service';

@Component({
  selector: 'app-track-visit',
  templateUrl: './track-visit.component.html',
  styleUrls: ['./track-visit.component.scss'],
})
export class TrackVisitComponent implements OnInit {
  visitId!: String;
  trackingForm: FormGroup;
  isLoading!: boolean;

  trackingData!: trackingVisit;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private visitorService: VisitorService,
    private notification: NotificationService
  ) {
    this.trackingForm = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.visitId = window.history.state.id;
    if (this.visitId) {
      this.trackingForm.get('id')?.setValue(this.visitId);
      this.trackVisitor();
    }
  }

  trackVisitor(): void {
    if (!this.trackingForm.get('id')?.valid) return;
    this.isLoading = true;
    this.visitorService.trackVisit(this.trackingForm.value.id).subscribe(
      (res: trackingVisit) => {
        this.isLoading = false;
        this.trackingData = res;
        console.log(res);
      },
      (error) => {
        this.isLoading = false;
        console.error(error);
        this.notification.showNotification(
          'warning',
          '#eb2f96',
          error.error.message
        );
        return;
      }
    );
  }
}
