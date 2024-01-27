import { TestBed } from '@angular/core/testing';

import { ProductSerialstblService } from './product-serialstbl.service';

describe('ProductSerialstblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSerialstblService = TestBed.get(ProductSerialstblService);
    expect(service).toBeTruthy();
  });
});
