import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingComponent } from './incoming.component';

describe('IncomingComponent', () => {
  let component: IncomingComponent;
  let fixture: ComponentFixture<IncomingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncomingComponent]
    });
    fixture = TestBed.createComponent(IncomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
