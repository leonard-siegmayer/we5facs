import { TestBed } from '@angular/core/testing';

import { EnumTranslationService } from './enum-translation.service';

describe('EnumTranslationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnumTranslationService = TestBed.get(EnumTranslationService);
    expect(service).toBeTruthy();
  });
});
