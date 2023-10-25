import { TestBed } from '@angular/core/testing';

import { VisitorManagementService } from './visitor-management.service';

describe('VisitorManagementService', () => {
  let service: VisitorManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
