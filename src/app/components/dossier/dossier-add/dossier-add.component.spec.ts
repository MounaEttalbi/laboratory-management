import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DossierAddComponent } from './dossier-add.component';
import { DossierService } from '../../../services/dossier.service'; // Importer le service
import { MatDialogRef } from '@angular/material/dialog';  // Importer pour la gestion du dialogue
import { of } from 'rxjs'; // Utilisation de l'opérateur RxJS pour simuler les observables
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

describe('DossierAddComponent', () => {
  let component: DossierAddComponent;
  let fixture: ComponentFixture<DossierAddComponent>;
  let dossierService: jasmine.SpyObj<DossierService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DossierAddComponent>>;

  beforeEach(async () => {
    // Créez une instance fictive du service Dossier
    dossierService = jasmine.createSpyObj('DossierService', ['createDossier']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [ DossierAddComponent ],
      imports: [ MatFormFieldModule, MatInputModule, MatButtonModule ], // Ajouter les modules nécessaires
      providers: [
        { provide: DossierService, useValue: dossierService },
        { provide: MatDialogRef, useValue: dialogRefSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Détection des changements dans le composant
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Vérifie que le composant a été créé avec succès
  });

  it('should call onSubmit and create a new dossier', () => {
    // Préparez un objet dossier valide
    const dossier: any = {
      date: '2024-12-20',
      fkEmailUtilisateur: 'user@example.com',
      fkIdPatient: 'patient123'
    };

    component.dossier = dossier; // Attribuez l'objet dossier au composant

    // Simulez la réponse du service createDossier
    dossierService.createDossier.and.returnValue(of(dossier));

    // Appeler la méthode onSubmit
    component.onSubmit();

    // Vérifiez que la méthode createDossier du service a été appelée avec le bon objet
    expect(dossierService.createDossier).toHaveBeenCalledWith(dossier);

    // Vérifiez que le dialogue est fermé après la création du dossier
    expect(dialogRefSpy.close).toHaveBeenCalledWith(dossier);
  });

  it('should not call createDossier if required fields are missing', () => {
    // Laissez le dossier avec des champs manquants
    component.dossier = { date: '', fkEmailUtilisateur: '', fkIdPatient: '' };

    // Appelez la méthode onSubmit
    component.onSubmit();

    // Vérifiez que la méthode createDossier n'a pas été appelée
    expect(dossierService.createDossier).not.toHaveBeenCalled();
  });
});
