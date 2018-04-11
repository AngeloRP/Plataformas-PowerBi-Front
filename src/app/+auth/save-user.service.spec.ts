import { TestBed, inject } from '@angular/core/testing';

import { SaveUserService } from './save-user.service';

describe('SaveUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaveUserService]
    });
  });

  it('should be created', inject([SaveUserService], (service: SaveUserService) => {
    expect(service).toBeTruthy();
  }));
});
