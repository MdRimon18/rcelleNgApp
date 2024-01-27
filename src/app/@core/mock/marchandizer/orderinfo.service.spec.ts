import { TestBed } from '@angular/core/testing';

import { OrderinfoService } from './orderinfo.service';

describe('OrderinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderinfoService = TestBed.get(OrderinfoService);
    expect(service).toBeTruthy();
  });
});
