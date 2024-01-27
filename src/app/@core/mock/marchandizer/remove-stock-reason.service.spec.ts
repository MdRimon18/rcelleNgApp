import { TestBed } from '@angular/core/testing';

import { RemoveStockReasonService } from './remove-stock-reason.service';

describe('RemoveStockReasonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveStockReasonService = TestBed.get(RemoveStockReasonService);
    expect(service).toBeTruthy();
  });
});
