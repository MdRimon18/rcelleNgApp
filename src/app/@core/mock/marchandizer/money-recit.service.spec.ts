import { TestBed } from '@angular/core/testing';

import { MoneyRecitService } from './money-recit.service';

describe('MoneyRecitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoneyRecitService = TestBed.get(MoneyRecitService);
    expect(service).toBeTruthy();
  });
});
