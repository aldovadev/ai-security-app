import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraManagementComponent } from './camera-management.component';

describe('CameraManagementComponent', () => {
  let component: CameraManagementComponent;
  let fixture: ComponentFixture<CameraManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraManagementComponent]
    });
    fixture = TestBed.createComponent(CameraManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
