import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdresseDeleteComponent } from './adresse-delete.component';
import { AdresseService } from '../../../services/adresse.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';

describe('AdresseDeleteComponent', () => {
  let component: AdresseDeleteComponent;
  let fixture: ComponentFixture<AdresseDeleteComponent>;
  let adresseServiceMock: any;
  let dialogRefMock: any;

  beforeEach(() => {
    // Création des mocks pour le service et le dialog
    adresseServiceMock = {
      deleteAdresse: jest.fn()
    };

    dialogRefMock = {
      close: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [AdresseDeleteComponent],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { id: 1 } } // ID de l'adresse à supprimer
      ]
    });

    fixture = TestBed.createComponent(AdresseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Masquer les erreurs dans la console pendant les tests
    jest.spyOn(console, 'error').mockImplementation(() => {});  // Suppression de l'affichage des erreurs
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCancel and close the dialog with false', () => {
    component.onCancel();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

  it('should call onDelete and close the dialog with true when delete is successful', () => {
    const mockResponse = { success: true };
    adresseServiceMock.deleteAdresse.mockReturnValue(of(mockResponse)); // Simuler une réponse réussie

    component.onDelete();
    expect(adresseServiceMock.deleteAdresse).toHaveBeenCalledWith(1); // ID passé via MAT_DIALOG_DATA
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should call onDelete and close the dialog with false when delete fails (using throwError)', () => {
    const mockError = new Error('Erreur lors de la suppression');
    adresseServiceMock.deleteAdresse.mockReturnValue(throwError(() => mockError)); // Simuler une erreur avec throwError

    component.onDelete();
    expect(adresseServiceMock.deleteAdresse).toHaveBeenCalledWith(1); // ID passé via MAT_DIALOG_DATA
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });

});
