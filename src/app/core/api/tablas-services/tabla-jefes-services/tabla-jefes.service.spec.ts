import { TestBed, inject } from '@angular/core/testing';

import { TablaJefesService } from './tabla-jefes.service';

describe('TablaJefesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TablaJefesService]
    });
  });

  it('should be created', inject([TablaJefesService], (service: TablaJefesService) => {
    expect(service).toBeTruthy();
  }));
});
