import { TestBed } from '@angular/core/testing';

import { MyShopEmpService } from './my-shop-emp.service';

describe('MyShopEmpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyShopEmpService = TestBed.get(MyShopEmpService);
    expect(service).toBeTruthy();
  });
});
