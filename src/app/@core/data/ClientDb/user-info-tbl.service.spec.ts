import { TestBed } from '@angular/core/testing';

import { UserInfoTblService } from './user-info-tbl.service';

describe('UserInfoTblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserInfoTblService = TestBed.get(UserInfoTblService);
    expect(service).toBeTruthy();
  });
});
