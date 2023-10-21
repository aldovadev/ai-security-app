import { Component, Inject, Input, OnInit } from '@angular/core';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { visitorData } from 'src/app/models/visitor-management';

@Component({
  selector: 'app-view-visitor',
  templateUrl: './view-visitor.component.html',
  styleUrls: ['./view-visitor.component.scss'],
})
export class ViewVisitorComponent implements OnInit {
  @Input() visitorData!: visitorData;

  constructor(
    private modal: NzModalRef,
    @Inject(NZ_MODAL_DATA) private data: visitorData
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  onCancel(): void {
    this.modal.destroy();
  }
}
