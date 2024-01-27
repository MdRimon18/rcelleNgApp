import { TestBed } from '@angular/core/testing';

import { OthersShopService } from './others-shop.service';

describe('OthersShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OthersShopService = TestBed.get(OthersShopService);
    expect(service).toBeTruthy();
  });
});
