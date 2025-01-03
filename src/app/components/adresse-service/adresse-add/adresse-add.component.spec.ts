import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { AdresseAddComponent } from './adresse-add.component';
import { AdresseService } from '../../../services/adresse.service';
import Swal from 'sweetalert2';

jest.mock('sweetalert2');

describe('AdresseAddComponent', () => {
  let component: AdresseAddComponent;
  let fixture: ComponentFixture<AdresseAddComponent>;
  let adresseServiceMock: any;

  beforeEach(() => {
    adresseServiceMock = {
      addAdresse: jest.fn()
    };

    // Masquer les erreurs de console pendant les tests
    jest.spyOn(console, 'error').mockImplementation(() => {});

    TestBed.configureTestingModule({
      declarations: [AdresseAddComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AdresseService, useValue: adresseServiceMock }
      ]
    });

    fixture = TestBed.createComponent(AdresseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.adresseForm;
    expect(form).toBeTruthy();
    expect(form.get('codePostal')?.value).toBe('');
    expect(form.get('ville')?.value).toBe('');
    expect(form.get('commune')?.value).toBe('');
    expect(form.get('rue')?.value).toBe('');
    expect(form.get('numero')?.value).toBe('');
    expect(form.get('numVoie')?.value).toBe('');
    expect(form.get('nomVoie')?.value).toBe('');
  });

  it('should validate the form fields correctly', () => {
    const form = component.adresseForm;

    form.get('codePostal')?.setValue('123');
    expect(form.get('codePostal')?.invalid).toBe(true);
    expect(component.getErrorMessage('codePostal')).toBe('Le code postal doit contenir exactement 5 chiffres');

    form.get('codePostal')?.setValue('75001');
    expect(form.get('codePostal')?.valid).toBe(true);

    form.get('numero')?.setValue('abc');
    expect(form.get('numero')?.invalid).toBe(true);
    expect(component.getErrorMessage('numero')).toBe('Le numéro doit être un entier positif');

    form.get('numero')?.setValue('123');
    expect(form.get('numero')?.valid).toBe(true);

    form.get('ville')?.setValue('');
    expect(form.get('ville')?.invalid).toBe(true);
    expect(component.getErrorMessage('ville')).toBe('Ce champ est requis');
  });

  it('should show error message when addAdresse fails', () => {
    const errorResponse = new Error('Error adding address');
    adresseServiceMock.addAdresse.mockReturnValue(throwError(() => errorResponse));

    const swalFireSpy = jest.spyOn(Swal, 'fire');
    component.adresseForm.setValue({
      codePostal: '75001',
      ville: 'Paris',
      commune: 'Paris',
      rue: 'Rue Lafayette',
      numero: '123',
      numVoie: '1',
      nomVoie: 'Boulevard'
    });

    component.onSubmit();

    expect(adresseServiceMock.addAdresse).toHaveBeenCalledWith(component.adresseForm.value);
    expect(swalFireSpy).toHaveBeenCalledWith('Erreur', 'Une erreur est survenue lors de l’ajout.', 'error');
  });

  it('should show error message when form is invalid', () => {
    const swalFireSpy = jest.spyOn(Swal, 'fire');

    component.adresseForm.setValue({
      codePostal: '',
      ville: '',
      commune: '',
      rue: '',
      numero: '',
      numVoie: '',
      nomVoie: ''
    });

    component.onSubmit();

    expect(adresseServiceMock.addAdresse).not.toHaveBeenCalled();
    expect(swalFireSpy).toHaveBeenCalledWith('Erreur', 'Veuillez corriger les erreurs dans le formulaire.', 'error');
  });
});
