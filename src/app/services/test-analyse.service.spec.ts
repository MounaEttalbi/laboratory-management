import { TestBed } from '@angular/core/testing';

import { TestAnalyseService } from './test-analyse.service';

describe('TestAnalyseService', () => {
  let service: TestAnalyseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestAnalyseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
