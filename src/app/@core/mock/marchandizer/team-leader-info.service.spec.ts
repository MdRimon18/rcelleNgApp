import { TestBed } from '@angular/core/testing';

import { TeamLeaderInfoService } from './team-leader-info.service';

describe('TeamLeaderInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeamLeaderInfoService = TestBed.get(TeamLeaderInfoService);
    expect(service).toBeTruthy();
  });
});
