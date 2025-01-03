import { TestBed } from '@angular/core/testing';

import { ResultatService } from './resultat.service';

describe('ResultatService', () => {
  let service: ResultatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
