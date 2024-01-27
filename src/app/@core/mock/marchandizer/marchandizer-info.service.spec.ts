import { TestBed } from '@angular/core/testing';

import { MarchandizerInfoService } from './marchandizer-info.service';

describe('MarchandizerInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarchandizerInfoService = TestBed.get(MarchandizerInfoService);
    expect(service).toBeTruthy();
  });
});
