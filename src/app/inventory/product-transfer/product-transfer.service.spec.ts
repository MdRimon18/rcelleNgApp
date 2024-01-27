import { TestBed } from '@angular/core/testing';

import { ProductTransferService } from './product-transfer.service';

describe('ProductTransferService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductTransferService = TestBed.get(ProductTransferService);
    expect(service).toBeTruthy();
  });
});
