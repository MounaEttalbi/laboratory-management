import { TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { DossierDeleteComponent } from './dossier-delete.component';
import { DossierService } from '../../../services/dossier.service';

describe('DossierDeleteComponent', () => {
  let component: DossierDeleteComponent;
  let dossierServiceMock: any;
  let dialogRefMock: any;

  beforeEach(() => {
    dossierServiceMock = {
      deleteDossier: jest.fn()
    };

    dialogRefMock = {
      close: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [DossierDeleteComponent],
      providers: [
        { provide: DossierService, useValue: dossierServiceMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { numDossier: 123 } }
      ]
    });

    const fixture = TestBed.createComponent(DossierDeleteComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteDossier and close the dialog with true on success', () => {
    dossierServiceMock.deleteDossier.mockReturnValue(of(null)); // Simule une suppression réussie

    component.onDelete();

    expect(dossierServiceMock.deleteDossier).toHaveBeenCalledWith(123);
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
  });

  it('should handle errors when deleteDossier fails', () => {
    const errorResponse = new Error('Error deleting dossier');
    dossierServiceMock.deleteDossier.mockReturnValue(throwError(() => errorResponse));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    component.onDelete();

    expect(dossierServiceMock.deleteDossier).toHaveBeenCalledWith(123);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la suppression du dossier:', errorResponse);
    expect(dialogRefMock.close).not.toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });

  it('should close the dialog with false on cancel', () => {
    component.onCancel();

    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
