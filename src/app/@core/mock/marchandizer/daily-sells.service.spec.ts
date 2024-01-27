import { TestBed } from '@angular/core/testing';

import { DailySellsService } from './daily-sells.service';

describe('DailySellsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailySellsService = TestBed.get(DailySellsService);
    expect(service).toBeTruthy();
  });
});
