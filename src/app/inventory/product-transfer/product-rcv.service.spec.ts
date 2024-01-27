import { TestBed } from '@angular/core/testing';

import { ProductRcvService } from './product-rcv.service';

describe('ProductRcvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductRcvService = TestBed.get(ProductRcvService);
    expect(service).toBeTruthy();
  });
});
