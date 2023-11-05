import { Component, Input } from '@angular/core';
import { recognizedData } from 'src/app/models/recognize.model';

@Component({
  selector: 'app-recognized-card',
  templateUrl: './recognized-card.component.html',
  styleUrls: ['./recognized-card.component.scss']
})
export class RecognizedCardComponent {
  @Input() recognizedData!: recognizedData;
}
