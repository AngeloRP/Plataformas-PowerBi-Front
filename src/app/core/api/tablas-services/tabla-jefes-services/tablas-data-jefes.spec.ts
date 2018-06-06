import { TestBed, inject } from '@angular/core/testing';

import { TablaDataJefesService } from './tabla-data-jefes.service';

describe('TablasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablasService]
    });
  });

  it('should be created', inject([TablasService], (service: TablasService) => {
    expect(service).toBeTruthy();
  }));
});
