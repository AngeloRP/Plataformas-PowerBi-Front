import { TestBed, inject } from '@angular/core/testing';

import { TablaEquiposService } from './tabla-equipos.service';

describe('TablaEquiposService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablaEquiposService]
    });
  });

  it('should be created', inject([TablaEquiposService], (service: TablaEquiposService) => {
    expect(service).toBeTruthy();
  }));
});
