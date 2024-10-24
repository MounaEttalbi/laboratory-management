import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { LaboratoireService } from '../services/laboratoire.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let laboratoireService: jest.Mocked<LaboratoireService>;

  beforeEach(async () => {
    // Créer un mock du service LaboratoireService
    laboratoireService = {
      getLaboratoires: jest.fn()
    } as unknown as jest.Mocked<LaboratoireService>;

    await TestBed.configureTestingModule({
      imports: [HomeComponent, CommonModule], // Importer HomeComponent
      providers: [
        { provide: LaboratoireService, useValue: laboratoireService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('devrait afficher une liste de laboratoires', () => {
    const mockLaboratoires = [
      { id: 1, nom: 'Labo1', statut: 'Actif', nrc: '12345', dateActivation: '2024-01-01', logo: 'url_to_logo1' },
      { id: 2, nom: 'Labo2', statut: 'Inactif', nrc: '67890', dateActivation: '2024-01-02', logo: 'url_to_logo2' }
    ]; // Exemple avec deux laboratoires

    laboratoireService.getLaboratoires.mockReturnValue(of(mockLaboratoires));

    // Initialiser le composant
    fixture.detectChanges(); // Cela appelle ngOnInit

    // Vérifier que la liste des laboratoires est affichée
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(mockLaboratoires.length); // Vérifier le nombre de lignes

    // Vérifier le contenu des cellules
    expect(rows[0].nativeElement.cells[1].textContent).toContain('Labo1'); // Vérifier le nom
    expect(rows[0].nativeElement.cells[2].textContent).toContain('Actif'); // Vérifier le statut
    expect(rows[0].nativeElement.cells[3].textContent).toContain('12345'); // Vérifier le NRC
    expect(rows[0].nativeElement.cells[4].textContent).toContain('Jan 1, 2024'); // Vérifier la date d'activation
    expect(rows[0].nativeElement.cells[5].querySelector('img').src).toContain('url_to_logo1'); // Vérifier le logo

    expect(rows[1].nativeElement.cells[1].textContent).toContain('Labo2'); // Vérifier le nom
    expect(rows[1].nativeElement.cells[2].textContent).toContain('Inactif'); // Vérifier le statut
    expect(rows[1].nativeElement.cells[3].textContent).toContain('67890'); // Vérifier le NRC
    expect(rows[1].nativeElement.cells[4].textContent).toContain('Jan 2, 2024'); // Vérifier la date d'activation
    expect(rows[1].nativeElement.cells[5].querySelector('img').src).toContain('url_to_logo2'); // Vérifier le logo
  });
});
