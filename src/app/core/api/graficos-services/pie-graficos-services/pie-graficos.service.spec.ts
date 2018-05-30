import { TestBed, inject } from '@angular/core/testing';

import { PieGraficosService } from './pie-graficos.service';

describe('PieGraficosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PieGraficosService]
    });
  });

  it('should be created', inject([PieGraficosService], (service: PieGraficosService) => {
    expect(service).toBeTruthy();
  }));
});
