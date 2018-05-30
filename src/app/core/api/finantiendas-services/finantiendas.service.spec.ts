import { TestBed, inject } from '@angular/core/testing';

import { FinantiendasService } from './finantiendas.service';

describe('FinantiendasService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinantiendasService]
    });
  });

  it('should be created', inject([FinantiendasService], (service: FinantiendasService) => {
    expect(service).toBeTruthy();
  }));
});
