import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { MatDialog } from '@angular/material/dialog';
import { PatientAddComponent } from './patient-add/patient-add.component';
import { PatientEditComponent } from './patient-edit/patient-edit.component'; // Assurez-vous d'avoir un composant pour l'édition
import { PatientDeleteComponent } from './patient-delete/patient-delete.component'; // Assurez-vous d'avoir un composant pour l'édition

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];
  filteredPatients: Patient[] = [];
  selectedPatient: Patient | null = null;
  isEditing: boolean = false;

  searchTerm: string = ''; // Variable pour la recherche

  constructor(private patientService: PatientService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe((data) => {
      this.patients = data;
      this.filteredPatients = data; // Par défaut, afficher tous les patients
    });
  }

  // Appliquer le filtre de recherche
  applyFilter(): void {
    const filterValue = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient =>
      patient.nomcomplet.toLowerCase().includes(filterValue) ||
      patient.email.toLowerCase().includes(filterValue) ||
      patient.numTel.toLowerCase().includes(filterValue)
    );
  }

  // Ouvrir le dialogue pour ajouter un patient
  openAddPatientDialog(): void {
    const dialogRef = this.dialog.open(PatientAddComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Résultat du dialogue :', result);
      if (result) {
        this.getPatients(); // Recharge la liste des patients après suppression
      }
    });
  }

  // Ouvrir le dialogue pour modifier un patient
  openEditPatientDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(PatientEditComponent, {
      width: '600px',
      data: { patient } // Passez les données du patient
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getPatients(); // Recharge la liste après la mise à jour
      }
    });
  }
  

  openDeleteDialog(patient: Patient): void {
    console.log('Patient passé au dialogue :', patient);
  
    if (!patient || !patient.idPatient) {
      console.error('Patient invalide pour la suppression :', patient);
      return;
    }
  
    const dialogRef = this.dialog.open(PatientDeleteComponent, {
      width: '400px',
      data: { patient }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Résultat du dialogue :', result);
      if (result) {
        this.getPatients(); // Recharge la liste des patients après suppression
      }
    });
  }
  
  displayedColumns: string[] = [
    'nomcomplet',
    'dateNaissance',
    'lieuDeNaissance',
    'sexe',
    'email',
    'numTel',
    'typePieceIdentite',
    'numPieceIdentite',
    'adresse',
    'visible_pour',
    'actions'
  ];
  
}
