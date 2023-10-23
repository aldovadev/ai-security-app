import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { visitorData } from 'src/app/models/visitor-management';
import { OptionService } from 'src/app/shared/service/option/option.service';
import { VisitorModuleService } from 'src/app/shared/service/visitor/visitor-module.service';

type response = {
  message: string;
  data: companyOption[];
};

type companyOption = {
  id: number;
  companyName: string;
};

type visitorResponse = {
  message: string;
  data: visitorData;
  url: string;
};

@Component({
  selector: 'app-view-visitor',
  templateUrl: './view-visitor.component.html',
  styleUrls: ['./view-visitor.component.scss'],
})
export class ViewVisitorComponent implements OnInit {
  @Input() visitorData!: visitorData;

  isLoading!: boolean;
  companyList: companyOption[] = [];
  visitForm: FormGroup;
  photoURL!: string;

  constructor(
    private fb: FormBuilder,
    private visitorModuleService: VisitorModuleService,
    private modal: NzModalRef,
    private optionService: OptionService,
    @Inject(NZ_MODAL_DATA) public data: { tab: string; visitId: string }
  ) {
    this.visitForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      phoneNumber: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      gender: ['', Validators.compose([Validators.required])],
      companyOrigin: [null, Validators.compose([])],
      companyDestination: ['', Validators.compose([Validators.required])],
      visitReason: ['', Validators.compose([Validators.required])],
      visitDate: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    console.log(this.data);
    this.fetchCompany();
    this.fetchData();
    this.isLoading = false;
  }

  fetchCompany(): void {
    this.optionService.companyOption().subscribe(
      (res: response) => {
        this.companyList = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  fetchData(): void {
    this.visitorModuleService.getVisitorProfile(this.data.visitId).subscribe(
      (res: visitorResponse) => {
        this.photoURL = res.url;
        this.visitForm.get('name')?.setValue(res.data.name);
        this.visitForm.get('phoneNumber')?.setValue(res.data.phoneNumber);
        this.visitForm.get('email')?.setValue(res.data.email);
        this.visitForm.get('address')?.setValue(res.data.address);
        this.visitForm.get('gender')?.setValue(res.data.gender);
        this.visitForm.get('companyOrigin')?.setValue(res.data.originId);
        this.visitForm
          .get('companyDestination')
          ?.setValue(res.data.destinationId);
        this.visitForm.get('visitReason')?.setValue(res.data.visitReason);
        this.visitForm
          .get('visitDate')
          ?.setValue([
            new Date(res.data.startDate),
            new Date(res.data.endDate),
          ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onCancel(): void {
    this.modal.destroy();
  }
}
