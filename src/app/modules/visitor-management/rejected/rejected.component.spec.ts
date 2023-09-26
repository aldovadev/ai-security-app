import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedComponent } from './rejected.component';

describe('RejectedComponent', () => {
  let component: RejectedComponent;
  let fixture: ComponentFixture<RejectedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedComponent]
    });
    fixture = TestBed.createComponent(RejectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
