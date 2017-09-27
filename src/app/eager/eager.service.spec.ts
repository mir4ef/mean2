import { inject, TestBed } from '@angular/core/testing';

import { EagerService } from './eager.service';

describe('EagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ EagerService ]
    });
  });

  it('should exist', inject([ EagerService ], (service: EagerService) => {
    expect(service).toBeTruthy();
  }));
});
