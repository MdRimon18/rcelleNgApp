import { TestBed } from '@angular/core/testing';

import { SuplierShopService } from './suplier-shop.service';

describe('SuplierShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuplierShopService = TestBed.get(SuplierShopService);
    expect(service).toBeTruthy();
  });
});
