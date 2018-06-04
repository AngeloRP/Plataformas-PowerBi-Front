import { TestBed, inject } from '@angular/core/testing';

import { TablaJefesAcumuladosService } from './tabla-jefes-acumulados.service';

describe('TablaJefesAcumuladosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablaJefesAcumuladosService]
    });
  });

  it('should be created', inject([TablaJefesAcumuladosService], (service: TablaJefesAcumuladosService) => {
    expect(service).toBeTruthy();
  }));
});
