import { TestBed, inject } from '@angular/core/testing';

import { FiltrosService } from './filtros.service';

describe('FiltrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltrosService]
    });
  });

  it('should be created', inject([FiltrosService], (service: FiltrosService) => {
    expect(service).toBeTruthy();
  }));
});
