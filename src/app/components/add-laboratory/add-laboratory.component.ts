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
    dateActivation: '',
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
    const laboratoireData = {
      nom: this.laboratoire.nom,
      nrc: this.laboratoire.nrc,
      statut: this.laboratoire.statut,
      dateActivation: new Date(this.laboratoire.dateActivation).toISOString()
    };
  
    this.laboratoireService.addLaboratoire(laboratoireData).subscribe({
      next: (response) => {
        this.laboratoryAdded.emit(); // Émettre l'événement 
        this.dialogRef.close();  // Fermer la fenêtre de dialogue
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du laboratoire :", error);
        alert("Erreur lors de l'ajout du laboratoire");
      }
    });
  }
  
  
}
