import { TestBed } from '@angular/core/testing';

import { OnlyNumberService } from './only-number.service';

describe('OnlyNumberService', () => {
  let service: OnlyNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlyNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
