import { TestBed } from '@angular/core/testing';

import { recognizeService } from './recognize.service';

describe('VisitorManagementService', () => {
  let service: recognizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(recognizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
