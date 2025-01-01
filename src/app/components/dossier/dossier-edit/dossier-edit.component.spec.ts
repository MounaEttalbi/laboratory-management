import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DossierEditComponent } from './dossier-edit.component';
import { DossierService } from '../../../services/dossier.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Dossier } from '../../../models/dossier.model';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DossierEditComponent', () => {
  let component: DossierEditComponent;
  let fixture: ComponentFixture<DossierEditComponent>;
  let dossierService: DossierService;
  let dialogRefMock: MatDialogRef<DossierEditComponent>;

  const mockDossier: Dossier = {
    numDossier: 123,
    date: '2024-12-01',
    fkEmailUtilisateur: 'test@example.com',
    fkIdPatient: 'patient123',
    status: 'Active'
  };

  beforeEach(() => {
    dialogRefMock = {
      close: jest.fn()
    } as unknown as MatDialogRef<DossierEditComponent>;

    TestBed.configureTestingModule({
      declarations: [DossierEditComponent],
      providers: [
        { provide: DossierService, useValue: { getDossierById: jest.fn(), updateDossier: jest.fn() } },
        { provide: MAT_DIALOG_DATA, useValue: { numDossier: 123 } },
        { provide: MatDialogRef, useValue: dialogRefMock }
      ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DossierEditComponent);
    component = fixture.componentInstance;
    dossierService = TestBed.inject(DossierService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load the dossier when the component is initialized', () => {
    // Mock the return value to return the mockDossier
    jest.spyOn(dossierService, 'getDossierById').mockReturnValue(of(mockDossier));

    component.ngOnInit();

    expect(dossierService.getDossierById).toHaveBeenCalledWith(123);
    expect(component.dossier).toEqual(mockDossier);
  });

  it('should handle error when loading the dossier fails', () => {
    const errorResponse = 'Error loading dossier';
    jest.spyOn(dossierService, 'getDossierById').mockReturnValue(throwError(() => new Error(errorResponse)));
  
    // Mock console.error to suppress error logs
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mocking console.error with a no-op function
    component.ngOnInit();
  
    // Expect that console.error was called with the correct error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Erreur lors de la récupération du dossier :',
      expect.objectContaining({
        message: errorResponse,
      })
    );
  
    // Clean up the mock
    consoleErrorSpy.mockRestore();
  });
  
  
  

  it('should update the dossier and close the dialog', () => {
    // Correctly mock the return value of updateDossier method
    jest.spyOn(dossierService, 'updateDossier').mockReturnValue(of(mockDossier)); // Utilisez mockDossier ici

    component.updateDossier();

    expect(dossierService.updateDossier).toHaveBeenCalledWith(component.dossier);
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalled();
  });
});
