import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { Router } from '@angular/router';
import {  MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-laboratory',
  templateUrl: './add-laboratory.component.html',
  styleUrls: ['./add-laboratory.component.css']
})
export class AddLaboratoryComponent implements OnInit {
  @Output() laboratoryAdded = new EventEmitter<void>(); // Événement à émettre après ajout

  // Déclarez la propriété 'laboratoire' et initialisez-la
  laboratoire = {
    nom: '',
    nrc: '',
    statut: '',
    date_activation: '',
    logo: null as File | null
  };
  isAdding = true; // Initialise l'affichage du formulaire

  showSuccessMessage = false;  // Control the display of the success message
  constructor(private laboratoireService: LaboratoireService, private router: Router,
    public dialogRef: MatDialogRef<AddLaboratoryComponent>
  ) {}
  ngOnInit(): void {
    console.log("AddLaboratoryComponent initialisé");
  }

  // Gestion du changement de fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.laboratoire.logo = file;
    }
  }

  addLaboratoire() {
    const formData = new FormData();

    // Ajout des champs de données
    formData.append('nom', this.laboratoire.nom);
    formData.append('nrc', this.laboratoire.nrc);
    formData.append('statut', this.laboratoire.statut);
    formData.append('date_activation', new Date(this.laboratoire.date_activation).toISOString().split('T')[0]);

    // Ajouter le fichier logo s'il existe
    if (this.laboratoire.logo) {
      formData.append('logo', this.laboratoire.logo);
    }

    this.laboratoireService.addLaboratoire(formData).subscribe({
      next: (response) => {
        this.laboratoryAdded.emit(); // Émettre l'événement 
        this.dialogRef.close();  // Close the dialog
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du laboratoire : ", error);
        alert("Erreur lors de l'ajout du laboratoire");
      }
    });
  }
}
