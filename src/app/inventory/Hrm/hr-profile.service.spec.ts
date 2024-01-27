import { TestBed } from '@angular/core/testing';

import { HrProfileService } from './hr-profile.service';

describe('HrProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrProfileService = TestBed.get(HrProfileService);
    expect(service).toBeTruthy();
  });
});
