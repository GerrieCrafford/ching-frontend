import { TestBed } from '@angular/core/testing';

import { ChingBackendService } from './ching-backend.service';

describe('ChingBackendService', () => {
  let service: ChingBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChingBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
