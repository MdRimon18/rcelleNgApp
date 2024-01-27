import { TestBed } from '@angular/core/testing';

import { ProductSubCategoriesService } from './product-sub-categories.service';

describe('ProductSubCategoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductSubCategoriesService = TestBed.get(ProductSubCategoriesService);
    expect(service).toBeTruthy();
  });
});
