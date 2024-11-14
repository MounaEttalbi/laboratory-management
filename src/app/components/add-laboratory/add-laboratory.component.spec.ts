import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddLaboratoryComponent } from './add-laboratory.component';
import { LaboratoireService } from '../../services/laboratoire.service';
import { of, throwError } from 'rxjs';

describe('AddLaboratoryComponent', () => {
  let component: AddLaboratoryComponent;
  let fixture: ComponentFixture<AddLaboratoryComponent>;
  let laboratoireService: LaboratoireService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLaboratoryComponent, FormsModule, HttpClientTestingModule], // Add the standalone component here
      providers: [LaboratoireService, { provide: Router, useValue: { navigate: jest.fn() } }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLaboratoryComponent);
    component = fixture.componentInstance;
    laboratoireService = TestBed.inject(LaboratoireService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should call addLaboratoire and navigate on success', () => {
    const laboratoire = {
      nom: 'Laboratoire Test',
      nrc: '12345',
      statut: 1,
      logo: null,
      date_activation: '2024-11-10'
    };
    
    jest.spyOn(laboratoireService, 'addLaboratoire').mockReturnValue(of({ success: true }));
    jest.spyOn(router, 'navigate');

    component.nom = laboratoire.nom;
    component.nrc = laboratoire.nrc;
    component.statut = laboratoire.statut;
    component.logo = laboratoire.logo;
    component.date_activation = laboratoire.date_activation;
    
    component.addLaboratoire();

    expect(laboratoireService.addLaboratoire).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/laboratoires']);
  });

  it('should handle error when addLaboratoire fails', () => {
    const laboratoire = {
      nom: 'Laboratoire Test',
      nrc: '12345',
      statut: 1,
      logo: null,
      date_activation: '2024-11-10'
    };
  
    jest.spyOn(laboratoireService, 'addLaboratoire').mockReturnValue(throwError({ error: 'Error occurred' }));
    jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock the alert
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
  
    component.nom = laboratoire.nom;
    component.nrc = laboratoire.nrc;
    component.statut = laboratoire.statut;
    component.logo = laboratoire.logo;
    component.date_activation = laboratoire.date_activation;
  
    component.addLaboratoire();
  
    expect(laboratoireService.addLaboratoire).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Erreur lors de l\'ajout du laboratoire');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de l\'ajout du laboratoire : ', { error: 'Error occurred' });
  
    consoleErrorSpy.mockRestore(); // Restore the spy after test
  });*/
  
  
});
