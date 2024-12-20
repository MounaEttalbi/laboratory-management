import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.scss']
})
export class PatientDeleteComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { patient: Patient },
    private dialogRef: MatDialogRef<PatientDeleteComponent>,
    private patientService: PatientService
  ) {}

  onDelete(): void {
    console.log('Patient à supprimer :', this.data.patient);
    if (this.data.patient.idPatient) {
      this.patientService.deletePatient(this.data.patient.idPatient).subscribe({
        next: () => {
          console.log('Patient supprimé avec succès');
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression :', error);
        }
      });
    } else {
      console.error('ID du patient non valide :', this.data.patient);
    }
  }
  

  onCancel(): void {
    this.dialogRef.close(false); // Annule la suppression
  }
}
