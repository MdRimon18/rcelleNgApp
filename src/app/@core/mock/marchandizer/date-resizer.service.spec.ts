import { TestBed } from '@angular/core/testing';

import { DateResizerService } from './date-resizer.service';

describe('DateResizerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateResizerService = TestBed.get(DateResizerService);
    expect(service).toBeTruthy();
  });
});
