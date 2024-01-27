import { TestBed } from '@angular/core/testing';

import { DailyIncomeExpanseService } from './daily-income-expanse.service';

describe('DailyIncomeExpanseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyIncomeExpanseService = TestBed.get(DailyIncomeExpanseService);
    expect(service).toBeTruthy();
  });
});
