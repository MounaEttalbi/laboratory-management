import { Component, EventEmitter, Output } from '@angular/core'; 
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css'],
})
export class PatientAddComponent {
  @Output() formClosed = new EventEmitter<void>(); // Événement pour notifier la fermeture du formulaire

  patient: Patient = {
    idPatient:0,
    nomcomplet: '',
    dateNaissance: '',
    lieuDeNaissance: '',
    sexe: '',
    typePieceIdentite: '',
    numPieceIdentite: '',
    adresse: '',
    numTel: '',
    email: '',
    visible_pour: '',
  };

  successMessage: string | null = null;
  errorMessage: string | null = null;
  isFormVisible: boolean = true; // Nouveau : contrôle de l'affichage du formulaire

  constructor(private patientService: PatientService, 
    public dialogRef: MatDialogRef<PatientAddComponent>) {}

  onSubmit() {
    this.patientService.addPatient(this.patient).subscribe({
      next: () => {
        this.dialogRef.close(true);
        this.formClosed.emit(); // Émettre l'événement après l'ajout
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de l’ajout du patient.';
        this.successMessage = null;
        console.error('Erreur:', error);
      },
    });
  }

  resetForm() {
    this.patient = {
      idPatient:0,
      nomcomplet: '',
      dateNaissance: '',
      lieuDeNaissance: '',
      sexe: '',
      typePieceIdentite: '',
      numPieceIdentite: '',
      adresse: '',
      numTel: '',
      email: '',
      visible_pour: '',
    };
  }

  showForm() {
    this.isFormVisible = true; // Réafficher le formulaire si nécessaire
  }
}
