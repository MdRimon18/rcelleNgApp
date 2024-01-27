import { TestBed } from '@angular/core/testing';

import { ItemCartTblService } from './item-cart-tbl.service';

describe('ItemCartTblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemCartTblService = TestBed.get(ItemCartTblService);
    expect(service).toBeTruthy();
  });
});
