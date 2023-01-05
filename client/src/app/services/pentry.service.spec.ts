import { TestBed } from '@angular/core/testing';

import { PentryService } from './pentry.service';

describe('PentryService', () => {
  let service: PentryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PentryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
