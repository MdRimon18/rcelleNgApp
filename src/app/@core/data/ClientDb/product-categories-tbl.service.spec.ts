import { TestBed } from '@angular/core/testing';

import { ProductCategoriesTblService } from './product-categories-tbl.service';

describe('ProductCategoriesTblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCategoriesTblService = TestBed.get(ProductCategoriesTblService);
    expect(service).toBeTruthy();
  });
});
