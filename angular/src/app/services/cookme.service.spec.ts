import { TestBed } from '@angular/core/testing';

import { CookmeService } from './cookme.service';

describe('CookmeService', () => {
  let service: CookmeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookmeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
