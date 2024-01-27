import { TestBed } from '@angular/core/testing';

import { PurchaseInvoiceDetailsService } from './purchase-invoice-details.service';

describe('PurchaseInvoiceDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseInvoiceDetailsService = TestBed.get(PurchaseInvoiceDetailsService);
    expect(service).toBeTruthy();
  });
});
