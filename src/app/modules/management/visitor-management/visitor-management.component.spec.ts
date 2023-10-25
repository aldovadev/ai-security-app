import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorManagementComponent } from './visitor-management.component';

describe('VisitorManagementComponent', () => {
  let component: VisitorManagementComponent;
  let fixture: ComponentFixture<VisitorManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorManagementComponent]
    });
    fixture = TestBed.createComponent(VisitorManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
