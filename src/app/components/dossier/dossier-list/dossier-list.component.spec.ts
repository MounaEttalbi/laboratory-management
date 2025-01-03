import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core'; // Import du NO_ERRORS_SCHEMA
import { of } from 'rxjs';

import { DossierListComponent } from './dossier-list.component';
import { DossierService } from '../../../services/dossier.service';
import { Dossier } from '../../../models/dossier.model';
import { DossierAddComponent } from '../dossier-add/dossier-add.component';
import { DossierEditComponent } from '../dossier-edit/dossier-edit.component';
import { DossierDeleteComponent } from '../dossier-delete/dossier-delete.component';

describe('DossierListComponent', () => {
  let component: DossierListComponent;
  let fixture: ComponentFixture<DossierListComponent>;
  let dossierService: DossierService;
  let dialog: MatDialog;

  const mockDossiers: Dossier[] = [
    { numDossier: 1, date: '2024-12-27', fkEmailUtilisateur: 'user1@example.com', fkIdPatient: '101', status: 'open' },
    { numDossier: 2, date: '2024-12-28', fkEmailUtilisateur: 'user2@example.com', fkIdPatient: '102', status: 'closed' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DossierListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DossierService,
          useValue: {
            getAllDossiers: jest.fn(() => of(mockDossiers)),
          },
        },
        {
          provide: MatDialog,
          useValue: {
            open: jest.fn(() => ({
              afterClosed: jest.fn(() => of(true)),
            })),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Ajout de NO_ERRORS_SCHEMA pour ignorer les erreurs de propriété inconnues
    }).compileComponents();

    fixture = TestBed.createComponent(DossierListComponent);
    component = fixture.componentInstance;
    dossierService = TestBed.inject(DossierService);
    dialog = TestBed.inject(MatDialog);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dossiers on initialization', () => {
    jest.spyOn(dossierService, 'getAllDossiers');
    component.ngOnInit();
    expect(dossierService.getAllDossiers).toHaveBeenCalled();
    expect(component.dossiers).toEqual(mockDossiers);
    expect(component.filteredDossiers).toEqual(mockDossiers);
  });

  it('should filter dossiers based on searchTerm', () => {
    component.searchTerm = 'user1';
    component.applyFilter();
    expect(component.filteredDossiers).toEqual([mockDossiers[0]]);
  });

  it('should open the add dossier dialog', () => {
    const openSpy = jest.spyOn(dialog, 'open');
    component.openAddDossierDialog();
    expect(openSpy).toHaveBeenCalledWith(DossierAddComponent, { width: '500px' });
  });

  it('should reload dossiers after closing add dossier dialog', () => {
    const loadSpy = jest.spyOn(component, 'loadDossiers');
    component.openAddDossierDialog();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should open the delete dossier dialog with correct data', () => {
    const openSpy = jest.spyOn(dialog, 'open');
    component.openDeleteDossierDialog(1);
    expect(openSpy).toHaveBeenCalledWith(DossierDeleteComponent, {
      width: '450px',
      data: { numDossier: 1 },
    });
  });

  it('should reload dossiers after closing delete dossier dialog', () => {
    const loadSpy = jest.spyOn(component, 'loadDossiers');
    component.openDeleteDossierDialog(1);
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should open the edit dossier dialog with correct data', () => {
    const openSpy = jest.spyOn(dialog, 'open');
    component.openEditDossierDialog(1);
    expect(openSpy).toHaveBeenCalledWith(DossierEditComponent, {
      width: '500px',
      data: { numDossier: 1 },
    });
  });

  it('should reload dossiers after closing edit dossier dialog', () => {
    const loadSpy = jest.spyOn(component, 'loadDossiers');
    component.openEditDossierDialog(1);
    expect(loadSpy).toHaveBeenCalled();
  });
});
