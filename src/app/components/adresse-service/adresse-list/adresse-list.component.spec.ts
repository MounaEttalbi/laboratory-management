import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdresseListComponent } from './adresse-list.component';
import { AdresseService } from '../../../services/adresse.service';
import { MatDialog } from '@angular/material/dialog';
import { AdresseAddComponent } from '../adresse-add/adresse-add.component';
import { AdresseUpdateComponent } from '../adresse-update/adresse-update.component';
import { AdresseDeleteComponent } from '../adresse-delete/adresse-delete.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AdresseListComponent', () => {
  let component: AdresseListComponent;
  let fixture: ComponentFixture<AdresseListComponent>;
  let adresseServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    // Mock du service AdresseService
    adresseServiceMock = {
      getAllAdresses: jest.fn().mockReturnValue(of([
        { id: 1, numVoie: '123', nomVoie: 'Rue ABC', codePostal: '12345', ville: 'Paris', commune: 'Paris' },
        { id: 2, numVoie: '456', nomVoie: 'Rue XYZ', codePostal: '67890', ville: 'Lyon', commune: 'Lyon' },
      ])),
    };

    // Mock du MatDialog
    dialogMock = {
      open: jest.fn().mockReturnValue({
        afterClosed: jest.fn().mockReturnValue(of(true)),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [AdresseListComponent, AdresseAddComponent, AdresseUpdateComponent, AdresseDeleteComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock },
        { provide: MatDialog, useValue: dialogMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],  // Ignore les erreurs liées aux composants enfants pour se concentrer sur le test du composant
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdresseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('devrait créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('devrait charger les adresses au démarrage', () => {
    component.ngOnInit();
    expect(adresseServiceMock.getAllAdresses).toHaveBeenCalled();
    expect(component.adresses.length).toBe(2);
  });

  it('devrait filtrer les adresses correctement', () => {
    component.adresses = [
      { id: 1, numVoie: '123', nomVoie: 'Rue ABC', codePostal: '12345', ville: 'Paris', commune: 'Paris' },
      { id: 2, numVoie: '456', nomVoie: 'Rue XYZ', codePostal: '67890', ville: 'Lyon', commune: 'Lyon' },
    ];
    component.searchTerm = 'Paris';
    component.filterAdresses();
    expect(component.filteredAdresses.length).toBe(1);
    expect(component.filteredAdresses[0].ville).toBe('Paris');
  });

  it('devrait ouvrir le dialogue d\'ajout d\'adresse', () => {
    component.openAddAdresseDialog();
    expect(dialogMock.open).toHaveBeenCalledWith(AdresseAddComponent);
  });

  it('devrait ouvrir le dialogue de mise à jour d\'adresse', () => {
    component.openUpdateAdresseDialog(1);
    expect(dialogMock.open).toHaveBeenCalledWith(AdresseUpdateComponent, {
      width: '600px',
      data: { adresseId: 1 },
    });
  });

  it('devrait ouvrir le dialogue de suppression d\'adresse', () => {
    component.openDeleteAdresseDialog(1);
    expect(dialogMock.open).toHaveBeenCalledWith(AdresseDeleteComponent, {
      data: { id: 1 },
    });
  });

  it('devrait recharger les adresses après ajout d\'une adresse', () => {
    dialogMock.open.mockReturnValueOnce({
      afterClosed: jest.fn().mockReturnValue(of(true)),
    });

    component.openAddAdresseDialog();
    expect(adresseServiceMock.getAllAdresses).toHaveBeenCalled();
  });

  it('devrait recharger les adresses après modification d\'une adresse', () => {
    dialogMock.open.mockReturnValueOnce({
      afterClosed: jest.fn().mockReturnValue(of(true)),
    });

    component.openUpdateAdresseDialog(1);
    expect(adresseServiceMock.getAllAdresses).toHaveBeenCalled();
  });

  it('devrait recharger les adresses après suppression d\'une adresse', () => {
    dialogMock.open.mockReturnValueOnce({
      afterClosed: jest.fn().mockReturnValue(of(true)),
    });

    component.openDeleteAdresseDialog(1);
    expect(adresseServiceMock.getAllAdresses).toHaveBeenCalled();
  });
});
