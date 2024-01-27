import { TestBed } from '@angular/core/testing';

import { ProductionDeptInfoesService } from './production-dept-infoes.service';

describe('ProductionDeptInfoesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductionDeptInfoesService = TestBed.get(ProductionDeptInfoesService);
    expect(service).toBeTruthy();
  });
});
