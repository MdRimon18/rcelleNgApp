import { TestBed } from '@angular/core/testing';

import { LanguageConverterService } from './language-converter.service';

describe('LanguageConverterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LanguageConverterService = TestBed.get(LanguageConverterService);
    expect(service).toBeTruthy();
  });
});
