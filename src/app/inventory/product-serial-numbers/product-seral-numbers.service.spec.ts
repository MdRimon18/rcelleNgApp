import { TestBed } from '@angular/core/testing';

import { ProductSeralNumbersService } from './product-seral-numbers.service';

describe('ProductSeralNumbersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSeralNumbersService = TestBed.get(ProductSeralNumbersService);
    expect(service).toBeTruthy();
  });
});
