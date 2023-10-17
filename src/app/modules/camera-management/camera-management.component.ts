import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera-management',
  templateUrl: './camera-management.component.html',
  styleUrls: ['./camera-management.component.scss'],
})
export class CameraManagementComponent implements OnInit {
  captureImage: boolean = false;
  constructor() {}
  ngOnInit(): void {}

  handleCapture(event: any): void {}
}
