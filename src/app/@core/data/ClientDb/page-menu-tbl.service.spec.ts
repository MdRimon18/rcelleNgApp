import { TestBed } from '@angular/core/testing';

import { PageMenuTblService } from './page-menu-tbl.service';

describe('PageMenuTblService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageMenuTblService = TestBed.get(PageMenuTblService);
    expect(service).toBeTruthy();
  });
});
