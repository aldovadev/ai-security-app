import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OnPhotoTakenEventValue, } from 'src/app/types';
import {
  dispatchControlEvent,
  FaceCustomEvent,
  ControlEventInstruction,
} from '@innovatrics/dot-face-auto-capture/events';
import { FaceComponentData } from '@innovatrics/dot-face-auto-capture/';

@Component({
  selector: 'app-face-auto-capture',
  templateUrl: './face-auto-capture.component.html',
  styleUrls: ['./face-auto-capture.component.css'],
})
export class FaceAutoCaptureComponent implements OnInit {
  @Output() onPhotoTaken = new EventEmitter<OnPhotoTakenEventValue<FaceComponentData>>();
  @Output() onError = new EventEmitter<Error>();

  constructor() { }

  ngOnInit(): void { }

  handlePhotoTaken({ imageData, content }: OnPhotoTakenEventValue<FaceComponentData>) {

    // dispatchControlEvent(
    //   FaceCustomEvent.CONTROL,
    //   ControlEventInstruction.CONTINUE_DETECTION
    // );

    this.onPhotoTaken.emit({ imageData, content });
  }

  handleError(error: Error) {
    this.onError.emit(error);
  }
}
