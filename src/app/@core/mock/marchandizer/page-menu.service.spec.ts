import { TestBed } from '@angular/core/testing';

import { PageMenuService } from './page-menu.service';

describe('PageMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageMenuService = TestBed.get(PageMenuService);
    expect(service).toBeTruthy();
  });
});
