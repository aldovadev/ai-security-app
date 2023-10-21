import { TestBed } from '@angular/core/testing';

import { VisitorModuleService } from './visitor-module.service';

describe('VisitorModuleService', () => {
  let service: VisitorModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
