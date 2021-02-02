import { TestBed } from '@angular/core/testing';

import { DiezppService } from './diezpp.service';

describe('DiezppService', () => {
  let service: DiezppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiezppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
