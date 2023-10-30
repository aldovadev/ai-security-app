import { Component, OnInit } from '@angular/core';
import { visitorProfile } from 'src/app/models/visitor.model';
import { OnPhotoTakenEventValue } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-camera-management',
  templateUrl: './camera-management.component.html',
  styleUrls: ['./camera-management.component.scss'],
})

export class CameraManagementComponent implements OnInit {

  camState: string = "FACE"
  activeTab: number = 0;
  imageUrl = '';

  visitorProfile: visitorProfile = {
    message: "Get visitor data success",
    data: {
      id: "68b9960c-6d96-488e-8519-4807762ed461",
      name: 'Aldova Guswantri',
      email: 'aldova811@gmail.com',
      phoneNumber: '6282386027470',
      gender: 'Pria',
      address:
        'Jln.Tutwuri, Blok IV, no.1, Kel. Surau Gadang, Kec, Nanggalo, Kota. Padang, Sumatera Barat',
      originId: '68b9960c-6d96-488e-8519-4807762ed461',
      destinationId: '68b9960c-6d96-488e-8519-4807762ed461',
      startDate: '2023-10-10T02:00:00.000Z',
      endDate: '2023-10-10T05:00:00.000Z',
      visitReason:
        'Bussiness discussion about ai security development for company needs, we want talk more about requirements with Minang Techno software development solution, and talk about contract also.',
      visitNumber: '20231017VST00',
      statusId: 1001,
      photoPath: 'visitor/23/10/17/20231017VST00/20231017VST00.png',
      createdAt: '2023-10-17T01:26:20.305Z',
      updatedAt: '2023-10-17T02:09:50.932Z',
      origin: {
        companyName: ''
      },
      destination: {
        companyName: 'Basitungkin Laboratory'
      },
      status: {
        statusName: 'Accepted'
      }
    },
    url: "https://storage.cloud.google.com/asa-file-storage/visitor/15045d6e-f800-44f8-8fbc-d295ff663874/23/10/28/20231028VST01/20231028VST01.png"
  };

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.activeTab = params['tab'] || 0;
    });
  }

  handleError(error: Error) {
    alert(error);
  }

  handlePhotoTaken<T>({ imageData, content }: OnPhotoTakenEventValue<T>) {
    this.imageUrl = URL.createObjectURL(imageData.image);
    console.log(this.imageUrl)

  }

  calculateDuration(): string {
    const startDate = new Date(this.visitorProfile.data.startDate);
    const endDate = new Date(this.visitorProfile.data.endDate);
    const durationMs = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  onTabClick(tabIndex: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabIndex },
      queryParamsHandling: 'merge',
    });
  }

  handleRefresh(): void {
    window.location.reload();
  }
}
