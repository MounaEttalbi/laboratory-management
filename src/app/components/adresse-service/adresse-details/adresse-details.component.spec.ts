import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AdresseDetailsComponent } from './adresse-details.component';
import { AdresseService } from '../../../services/adresse.service';
import { of, throwError } from 'rxjs'; // Importer throwError
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { jest } from '@jest/globals';  // Assurez-vous d'utiliser jest si nécessaire

describe('AdresseDetailsComponent', () => {
  let component: AdresseDetailsComponent;
  let fixture: ComponentFixture<AdresseDetailsComponent>;
  let adresseService: AdresseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdresseDetailsComponent],
      imports: [HttpClientTestingModule],
      providers: [
        AdresseService,
        { provide: MAT_DIALOG_DATA, useValue: { adresseId: 1 } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdresseDetailsComponent);
    component = fixture.componentInstance;
    adresseService = TestBed.inject(AdresseService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load adresse successfully when getAdresseById succeeds', fakeAsync(() => {
    const adresseMock = { id: 1, numVoie: '123', nomVoie: 'Test St', codePostal: '12345', ville: 'Test Ville', commune: 'Test Commune' };
    
    // Utilisation de jest.spyOn pour espionner et simuler la réponse réussie
    jest.spyOn(adresseService, 'getAdresseById').mockReturnValue(of(adresseMock));

    component.loadAdresse(1);
    tick();  // Simuler le passage du temps pour les opérations asynchrones
    fixture.detectChanges();

    expect(component.adresse).toEqual(adresseMock);
  }));

  it('should handle error when getAdresseById fails', fakeAsync(() => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionner et ignorer les erreurs
  
    jest.spyOn(adresseService, 'getAdresseById').mockReturnValue(throwError('Error'));
  
    component.loadAdresse(1);
    tick();  // Simuler le passage du temps pour les opérations asynchrones
    fixture.detectChanges();
  
    // Vérification du message d'erreur
    expect(component.errorMessage).toBe("Impossible de charger l'adresse.");
  
    consoleErrorSpy.mockRestore(); // Restaurer le comportement normal de console.error
  }));
  
});
