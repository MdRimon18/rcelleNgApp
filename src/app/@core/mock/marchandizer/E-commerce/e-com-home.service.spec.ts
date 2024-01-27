import { TestBed } from '@angular/core/testing';

import { EComHomeService } from './e-com-home.service';

describe('EComHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EComHomeService = TestBed.get(EComHomeService);
    expect(service).toBeTruthy();
  });
});
