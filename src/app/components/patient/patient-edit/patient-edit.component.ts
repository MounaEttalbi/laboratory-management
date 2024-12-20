import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent {
  patient: Patient;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
    private dialogRef: MatDialogRef<PatientEditComponent>,
    private patientService: PatientService
  ) {
    this.patient = { ...data.patient };
    this.patient.dateNaissance = this.formatDate(this.patient.dateNaissance);
  }

  // Convertit la date ISO du backend en YYYY-MM-DD
  formatDate(date: string): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Mois entre 1 et 12
    const day = String(d.getDate()).padStart(2, '0'); // Jour
    return `${year}-${month}-${day}`;
  }

  onSave(): void {
    if (this.patient.idPatient) {
      this.patientService.updatePatient(this.patient.idPatient, this.patient).subscribe({
        next: (updatedPatient) => {
          console.log('Patient mis à jour avec succès :', updatedPatient);
          this.dialogRef.close(true); // Confirme la mise à jour
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du patient :', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false); // Annule la mise à jour
  }
}
