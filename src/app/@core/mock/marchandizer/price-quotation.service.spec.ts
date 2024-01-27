import { TestBed } from '@angular/core/testing';

import { PriceQuotationService } from './price-quotation.service';

describe('PriceQuotationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PriceQuotationService = TestBed.get(PriceQuotationService);
    expect(service).toBeTruthy();
  });
});
