import { TestBed } from '@angular/core/testing';

import { SignUpByShopService } from './sign-up-by-shop.service';

describe('SignUpByShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SignUpByShopService = TestBed.get(SignUpByShopService);
    expect(service).toBeTruthy();
  });
});
