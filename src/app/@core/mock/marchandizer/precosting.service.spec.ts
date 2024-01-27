import { TestBed } from '@angular/core/testing';

import { PrecostingService } from './precosting.service';

describe('PrecostingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PrecostingService = TestBed.get(PrecostingService);
    expect(service).toBeTruthy();
  });
});
