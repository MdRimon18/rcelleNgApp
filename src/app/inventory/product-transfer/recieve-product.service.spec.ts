import { TestBed } from '@angular/core/testing';

import { RecieveProductService } from './recieve-product.service';

describe('RecieveProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecieveProductService = TestBed.get(RecieveProductService);
    expect(service).toBeTruthy();
  });
});
