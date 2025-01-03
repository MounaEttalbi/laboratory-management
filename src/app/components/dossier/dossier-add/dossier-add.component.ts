import { Component,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';  // Pour fermer le dialogue
import { DossierService } from '../../../services/dossier.service';// Import du service
import { Dossier } from '../../../models/dossier.model'; // Import du modèle
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-dossier-add',
  templateUrl: './dossier-add.component.html',
  styleUrls: ['./dossier-add.component.css']
})
export class DossierAddComponent implements OnInit {
  dossier: Dossier = {
    date: '',
    fkEmailUtilisateur: '',
    fkIdPatient: '',
    status: 'Active'
  };
  patients: Patient[] = [];
  constructor(
    private dossierService: DossierService,
    public dialogRef: MatDialogRef<DossierAddComponent>,  // Pour fermer le dialogue après ajout
    private patientService: PatientService
  ) {}
  ngOnInit(): void {
    this.loadPatients();
  }

  // Méthode pour soumettre le formulaire et créer un dossier
  onSubmit(): void {
    if (this.dossier.date && this.dossier.fkEmailUtilisateur && this.dossier.fkIdPatient) {
      this.dossierService.createDossier(this.dossier).subscribe(
        (newDossier) => {
          console.log('Dossier créé:', newDossier);
          this.dialogRef.close(newDossier);  // Ferme le dialogue après la création
        },
        (error) => {
          console.error('Erreur lors de la création du dossier:', error);
        }
      );
    }
  }

  // Méthode pour fermer le dialogue sans action
  onCancel(): void {
    this.dialogRef.close();
  }
  loadPatients(): void {
    this.patientService.getPatients().subscribe(
      (data) => {
        this.patients = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des patients', error);
      }
    );
  }
  
}
