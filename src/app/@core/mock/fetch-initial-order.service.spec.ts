import { TestBed } from '@angular/core/testing';

import { FetchInitialOrderService } from './fetch-initial-order.service';

describe('FetchInitialOrderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchInitialOrderService = TestBed.get(FetchInitialOrderService);
    expect(service).toBeTruthy();
  });
});
