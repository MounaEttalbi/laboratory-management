import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdresseService } from '../../../services/adresse.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adresse-add',
  templateUrl: './adresse-add.component.html',
  styleUrls: ['./adresse-add.component.scss']
})
export class AdresseAddComponent {
  adresseForm: FormGroup;

  constructor(private fb: FormBuilder, private adresseService: AdresseService) {
    this.adresseForm = this.fb.group({
      codePostal: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]], // Ex: 75001
      ville: ['', [Validators.required]],
      commune: ['', [Validators.required]],
      rue: ['', [Validators.required]],
      numero: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Numéro uniquement
      numVoie: ['', [Validators.required]], // Nouveau champ
      nomVoie: ['', [Validators.required]], // Nouveau champ
    });
  }
  

  onSubmit() {
    if (this.adresseForm.valid) {
      const adresseData = this.adresseForm.value;

      this.adresseService.addAdresse(adresseData).subscribe({
        next: (response) => {
          Swal.fire('Succès', 'Adresse ajoutée avec succès !', 'success');
          this.adresseForm.reset(); // Réinitialise le formulaire après un ajout réussi
        },
        error: (err) => {
          Swal.fire('Erreur', 'Une erreur est survenue lors de l’ajout.', 'error');
          console.error(err);
        },
      });
    } else {
      Swal.fire('Erreur', 'Veuillez corriger les erreurs dans le formulaire.', 'error');
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.adresseForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    }
    if (controlName === 'codePostal' && control?.hasError('pattern')) {
      return 'Le code postal doit contenir exactement 5 chiffres';
    }
    if (controlName === 'numero' && control?.hasError('pattern')) {
      return 'Le numéro doit être un entier positif';
    }
    return '';
  }
}
