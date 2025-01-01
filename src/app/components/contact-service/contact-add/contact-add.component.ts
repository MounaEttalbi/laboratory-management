import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { LaboratoireService } from '../../../services/laboratoire.service'; // Import du service des laboratoires
import Swal from 'sweetalert2';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validateur pour numéro de téléphone (commence par +212 et suivi de 9 chiffres)
export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneNumber = control.value;
    const phonePattern = /^\+212\d{9}$/;  // Vérifie le format +212 suivi de 9 chiffres

    // Si le numéro ne correspond pas au pattern, retourne une erreur
    return phoneNumber && !phonePattern.test(phoneNumber)
      ? { invalidPhoneNumber: 'Le numéro doit commencer par +212 et être suivi de 9 chiffres' }
      : null;
  };
}

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit {
  contactForm: FormGroup;
  laboratoires: any[] = []; // Liste des laboratoires récupérés depuis le backend
  selectedLaboratoireId: number | null = null; // ID du laboratoire sélectionné
  laboratoryName: string = ''; // Nom du laboratoire récupéré

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private laboratoireService: LaboratoireService // Injecte le service des laboratoires
  ) {
    // Initialisation du formulaire avec le validateur pour le numéro de téléphone
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, phoneNumberValidator()]],  // Application du validateur
      fax: [''],
      fkIdLaboratoire: ['', Validators.required], // Sélection du laboratoire
    });
  }

  ngOnInit(): void {
    this.loadLaboratoires(); // Charge les laboratoires lors de l'initialisation
  }

  // Charger les laboratoires depuis le backend
  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe({
      next: (data) => {
        this.laboratoires = data; // Stocke la liste des laboratoires
      },
      error: (err) => {
        console.error('Erreur lors du chargement des laboratoires :', err);
        Swal.fire('Erreur', 'Impossible de charger la liste des laboratoires.', 'error');
      },
    });
  }
  // Soumettre le formulaire pour ajouter un contact
  onSubmit(): void {
    if (this.contactForm.valid) {
      const contactData = this.contactForm.value;

      this.contactService.addContact(contactData).subscribe({
        next: () => {
          Swal.fire('Succès', 'Contact ajouté avec succès !', 'success');
          this.contactForm.reset(); // Réinitialise le formulaire
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout du contact :', err);
          Swal.fire('Erreur', 'Une erreur est survenue lors de l’ajout.', 'error');
        },
      });
    } else {
      Swal.fire('Erreur', 'Veuillez corriger les erreurs dans le formulaire.', 'error');
    }
  }

  // Gérer les messages d'erreur
  getErrorMessage(field: string): string {
    const control = this.contactForm.get(field);
    if (control?.hasError('required')) {
      return 'Ce champ est requis';
    } else if (control?.hasError('email')) {
      return 'L\'email n\'est pas valide';
    } else if (control?.hasError('invalidPhoneNumber')) {
      return 'Le numéro doit commencer par +212 et être suivi de 9 chiffres';
    }
    return '';
  }
}
