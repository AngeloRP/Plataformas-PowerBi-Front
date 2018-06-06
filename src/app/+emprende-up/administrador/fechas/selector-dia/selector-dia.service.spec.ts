import { TestBed, inject } from '@angular/core/testing';

import { SelectorDiaService } from './selector-dia.service';

describe('SelectorDiaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectorDiaService]
    });
  });

  it('should be created', inject([SelectorDiaService], (service: SelectorDiaService) => {
    expect(service).toBeTruthy();
  }));
});
