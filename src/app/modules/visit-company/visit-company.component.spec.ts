import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitCompanyComponent } from './visit-company.component';

describe('VisitCompanyComponent', () => {
  let component: VisitCompanyComponent;
  let fixture: ComponentFixture<VisitCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitCompanyComponent]
    });
    fixture = TestBed.createComponent(VisitCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
