import { TestBed } from '@angular/core/testing';

import { PurchaseMoneyRecitService } from './purchase-money-recit.service';

describe('PurchaseMoneyRecitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseMoneyRecitService = TestBed.get(PurchaseMoneyRecitService);
    expect(service).toBeTruthy();
  });
});
