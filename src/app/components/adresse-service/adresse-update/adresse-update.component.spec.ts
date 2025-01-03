import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdresseUpdateComponent } from './adresse-update.component';
import { AdresseService } from '../../../services/adresse.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AdresseUpdateComponent', () => {
  let component: AdresseUpdateComponent;
  let fixture: ComponentFixture<AdresseUpdateComponent>;
  let adresseServiceMock: any;
  let dialogRefMock: any;

  beforeEach(async () => {
    // Mock du service AdresseService
    adresseServiceMock = {
      getAdresseById: jest.fn().mockReturnValue(of({ id: 1, numVoie: '123', nomVoie: 'Rue ABC', codePostal: '12345', ville: 'Paris', commune: 'Paris' })),
      updateAdresse: jest.fn().mockReturnValue(of({ id: 1, numVoie: '123', nomVoie: 'Rue ABC', codePostal: '12345', ville: 'Paris', commune: 'Paris' }))
    };

    // Mock du MatDialogRef
    dialogRefMock = {
      close: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AdresseUpdateComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { adresseId: 1 } },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait charger les données de l\'adresse au démarrage', () => {
    component.ngOnInit();
    expect(adresseServiceMock.getAdresseById).toHaveBeenCalledWith(1);
    expect(component.adresseForm.value).toEqual({ 
      numVoie: '123',
      nomVoie: 'Rue ABC',
      codePostal: '12345',
      ville: 'Paris',
      commune: 'Paris'
    });
  });

  it('devrait afficher une erreur si le service de chargement échoue', () => {
    // Simule une erreur lors du chargement de l'adresse
    adresseServiceMock.getAdresseById.mockReturnValueOnce(throwError(() => new Error('Erreur de chargement')));

    component.ngOnInit();  // Appel de la méthode ngOnInit qui charge l'adresse
    
    expect(adresseServiceMock.getAdresseById).toHaveBeenCalledWith(1);
    
    // Si nécessaire, vous pouvez tester la gestion de l'erreur via un spy sur console.error par exemple
  });

  it('devrait appeler le service pour mettre à jour l\'adresse', () => {
    component.adresseForm.setValue({
      numVoie: '456',
      nomVoie: 'Rue DEF',
      codePostal: '67890',
      ville: 'Lyon',
      commune: 'Lyon'
    });

    component.onUpdate();
    
    expect(adresseServiceMock.updateAdresse).toHaveBeenCalledWith(1, {
      numVoie: '456',
      nomVoie: 'Rue DEF',
      codePostal: '67890',
      ville: 'Lyon',
      commune: 'Lyon'
    });
    
    expect(dialogRefMock.close).toHaveBeenCalledWith(true); // Le dialogue se ferme après la mise à jour
  });

  it('devrait afficher une erreur si le service de mise à jour échoue', () => {
    // Simule une erreur lors de la mise à jour de l'adresse
    adresseServiceMock.updateAdresse.mockReturnValueOnce(throwError(() => new Error('Erreur de mise à jour')));

    component.adresseForm.setValue({
      numVoie: '456',
      nomVoie: 'Rue DEF',
      codePostal: '67890',
      ville: 'Lyon',
      commune: 'Lyon'
    });

    component.onUpdate();

    expect(adresseServiceMock.updateAdresse).toHaveBeenCalled();
    // Vérifier que l'erreur est loguée (cela peut être fait avec un spy sur `console.error` si nécessaire)
  });
});
