import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { DossierAddComponent } from './dossier-add.component';
import { DossierService } from '../../../services/dossier.service';
import { PatientService } from '../../../services/patient.service';

describe('DossierAddComponent', () => {
  let component: DossierAddComponent;
  let dossierServiceMock: any;
  let patientServiceMock: any;
  let dialogRefMock: any;

  beforeEach(() => {
    dossierServiceMock = {
      createDossier: jest.fn()
    };

    patientServiceMock = {
      getPatients: jest.fn()
    };

    dialogRefMock = {
      close: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [DossierAddComponent],
      providers: [
        { provide: DossierService, useValue: dossierServiceMock },
        { provide: PatientService, useValue: patientServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    });

    const fixture = TestBed.createComponent(DossierAddComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load patients on initialization', () => {
    const mockPatients = [
      { id: '1', name: 'Patient 1' },
      { id: '2', name: 'Patient 2' }
    ];
    patientServiceMock.getPatients.mockReturnValue(of(mockPatients));

    component.ngOnInit();

    expect(patientServiceMock.getPatients).toHaveBeenCalled();
    expect(component.patients).toEqual(mockPatients);
  });

  it('should handle error when loading patients fails', () => {
    const errorResponse = new Error('Error loading patients');
    patientServiceMock.getPatients.mockReturnValue(throwError(() => errorResponse));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.ngOnInit();

    expect(patientServiceMock.getPatients).toHaveBeenCalled();
    expect(component.patients).toEqual([]);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors du chargement des patients', errorResponse);

    consoleErrorSpy.mockRestore();
  });

  it('should call createDossier and close the dialog with the new dossier on success', () => {
    const mockDossier = { id: '1', date: '2024-01-01', fkEmailUtilisateur: 'test@example.com', fkIdPatient: '123', status: 'Active' };
    dossierServiceMock.createDossier.mockReturnValue(of(mockDossier));

    component.dossier = {
      date: '2024-01-01',
      fkEmailUtilisateur: 'test@example.com',
      fkIdPatient: '123',
      status: 'Active'
    };

    component.onSubmit();

    expect(dossierServiceMock.createDossier).toHaveBeenCalledWith(component.dossier);
    expect(dialogRefMock.close).toHaveBeenCalledWith(mockDossier);
  });

  it('should handle error when createDossier fails', () => {
    const errorResponse = new Error('Error creating dossier');
    dossierServiceMock.createDossier.mockReturnValue(throwError(() => errorResponse));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.dossier = {
      date: '2024-01-01',
      fkEmailUtilisateur: 'test@example.com',
      fkIdPatient: '123',
      status: 'Active'
    };

    component.onSubmit();

    expect(dossierServiceMock.createDossier).toHaveBeenCalledWith(component.dossier);
    expect(dialogRefMock.close).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la création du dossier:', errorResponse);

    consoleErrorSpy.mockRestore();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();

    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
