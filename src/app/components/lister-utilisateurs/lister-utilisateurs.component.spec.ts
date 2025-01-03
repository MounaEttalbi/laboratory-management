import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListerUtilisateursComponent } from './lister-utilisateurs.component';
import { UtilisateurService } from '../../services/utilisateur.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { AjouterUtilisateurComponent } from '../ajouter-utilisateur/ajouter-utilisateur.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ListerUtilisateursComponent', () => {
  let component: ListerUtilisateursComponent;
  let fixture: ComponentFixture<ListerUtilisateursComponent>;
  let utilisateurServiceMock: any;
  let dialogMock: any;

  beforeEach(async () => {
    utilisateurServiceMock = {
      getUtilisateurs: jest.fn().mockReturnValue(of([{ cin: '123', nomComplet: 'Test User', email: 'test@example.com', numTel: '1234567890', profession: 'Developer' }])),
      deleteUtilisateur: jest.fn().mockReturnValue(of({})),
    };

    dialogMock = {
      open: jest.fn().mockReturnValue({ afterClosed: () => of({ cin: '123', nomComplet: 'Updated User', email: 'updated@example.com' }) }),
    };

    await TestBed.configureTestingModule({
      declarations: [ListerUtilisateursComponent],
      imports: [MatTableModule],
      providers: [
        { provide: UtilisateurService, useValue: utilisateurServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch utilisateurs on init', () => {
    expect(utilisateurServiceMock.getUtilisateurs).toHaveBeenCalled();
    expect(component.utilisateurs.length).toBeGreaterThan(0);
  });

  it('should delete an utilisateur', () => {
    const utilisateurToDelete = { cin: '123' };
    component.onDeleteUser(utilisateurToDelete);
    expect(utilisateurServiceMock.deleteUtilisateur).toHaveBeenCalledWith('123');
  });

  it('should open dialog to add a new utilisateur', () => {
    component.onAddUser();
    expect(dialogMock.open).toHaveBeenCalledWith(AjouterUtilisateurComponent, { width: '600px' });
  });

  it('should update the utilisateurs list after adding a new utilisateur', () => {
    component.onAddUser();
    expect(component.utilisateurs.length).toBeGreaterThan(0);
  });

 

  it('should open dialog to edit an utilisateur', () => {
    const utilisateurToEdit = { cin: '123', nomComplet: 'Test User' };
    component.onEditUser(utilisateurToEdit);
    expect(dialogMock.open).toHaveBeenCalledWith(AjouterUtilisateurComponent, {
      width: '500px',
      data: utilisateurToEdit
    });
  });
});
