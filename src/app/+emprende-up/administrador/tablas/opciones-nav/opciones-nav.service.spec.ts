import { TestBed, inject } from '@angular/core/testing';

import { OpcionesNavService } from './opciones-nav.service';

describe('OpcionesNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpcionesNavService]
    });
  });

  it('should be created', inject([OpcionesNavService], (service: OpcionesNavService) => {
    expect(service).toBeTruthy();
  }));
});
