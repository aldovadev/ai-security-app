import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorComponent } from './modules/visitor/visitor.component';

describe('VisitCompanyComponent', () => {
  let component: VisitorComponent;
  let fixture: ComponentFixture<VisitorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisitorComponent]
    });
    fixture = TestBed.createComponent(VisitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
