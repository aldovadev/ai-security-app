import { Component, OnInit } from '@angular/core';
import { visitorProfile } from 'src/app/models/visitor.model';

@Component({
  selector: 'app-camera-management',
  templateUrl: './camera-management.component.html',
  styleUrls: ['./camera-management.component.scss'],
})
export class CameraManagementComponent implements OnInit {
  captureImage: boolean = false;
  showCamera!: boolean;

  visitorProfile: visitorProfile = {
    id: 59,
    name: 'Aldova Guswantri',
    email: 'aldova811@gmail.com',
    phone_number: '6282386027470',
    gender: 'Pria',
    address:
      'Jln.Tutwuri, Blok IV, no.1, Kel. Surau Gadang, Kec, Nanggalo, Kota. Padang, Sumatera Barat',
    company_origin: 'Minang Techno',
    company_destination: 'Omni Metro Guardian',
    start_date: '2023-10-10T02:00:00.000Z',
    end_date: '2023-10-10T05:00:00.000Z',
    visit_reason:
      'Bussiness discussion about ai security development for company needs, we want talk more about requirements with Minang Techno software development solution, and talk about contract also.',
    visit_number: '20231017VST00',
    visit_status: 'Unverified',
    photo_path: 'visitor/23/10/17/20231017VST00/20231017VST00.png',
    createdAt: '2023-10-17T01:26:20.305Z',
    updatedAt: '2023-10-17T02:09:50.932Z',
  };
  constructor() { }
  ngOnInit(): void { }

  handleRefresh(): void {
    window.location.reload();
  }

  handleShow(): void {
    this.showCamera = !this.showCamera;
  }
  handleCapture(event: any): void { }

  calculateDuration(): string {
    const startDate = new Date(this.visitorProfile.start_date);
    const endDate = new Date(this.visitorProfile.end_date);
    const durationMs = endDate.getTime() - startDate.getTime();

    const hours = Math.floor(durationMs / 3600000);
    const minutes = Math.floor((durationMs % 3600000) / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}
