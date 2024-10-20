import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LaboratoireService } from './laboratoire.service';

describe('LaboratoireService', () => {
  let service: LaboratoireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Ajoutez HttpClientTestingModule ici
      providers: [LaboratoireService],
    });
    service = TestBed.inject(LaboratoireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
