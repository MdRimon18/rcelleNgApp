import { TestBed } from '@angular/core/testing';

import { DeuPaymentDetailsService } from './deu-payment-details.service';

describe('DeuPaymentDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeuPaymentDetailsService = TestBed.get(DeuPaymentDetailsService);
    expect(service).toBeTruthy();
  });
});
