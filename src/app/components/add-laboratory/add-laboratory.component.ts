import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-laboratory',
  templateUrl: './add-laboratory.component.html',
  styleUrls: ['./add-laboratory.component.css']
})
export class AddLaboratoryComponent implements OnInit {
  @Output() laboratoryAdded = new EventEmitter<void>(); // Événement à émettre après ajout
  isAdding: boolean = true; // Définir cette propriété pour éviter l'erreur

  laboratoire = {
    nom: '',
    nrc: '',
    statut: '',
    dateActivation: '',
    logo: ''  // Stocke l'URL du logo
  };

  constructor(
    private laboratoireService: LaboratoireService, 
    public dialogRef: MatDialogRef<AddLaboratoryComponent>
  ) {}

  ngOnInit(): void {
    console.log("AddLaboratoryComponent initialisé");
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name; // Récupère le nom du fichier (par exemple, "logo.png")
  
      // Concatène le chemin "assets/" avec le nom du fichier
      this.laboratoire.logo = `assets/${fileName}`;
      console.log("Chemin généré pour le logo :", this.laboratoire.logo);
    }
  }
  

  // Méthode pour ajouter un laboratoire
  addLaboratoire() {
    const laboratoireData = {
      nom: this.laboratoire.nom,
      nrc: this.laboratoire.nrc,
      statut: this.laboratoire.statut,
      logo: this.laboratoire.logo, // Envoie uniquement l'URL du logo
      dateActivation: new Date(this.laboratoire.dateActivation).toISOString()
    };

    // Appelez le service pour ajouter le laboratoire
    this.laboratoireService.addLaboratoire(laboratoireData).subscribe({
      next: (response) => {
        this.laboratoryAdded.emit(); // Émettre l'événement après ajout
        this.dialogRef.close(); // Fermer la fenêtre de dialogue
      },
      error: (error) => {
        console.error("Erreur lors de l'ajout du laboratoire :", error);
        alert("Erreur lors de l'ajout du laboratoire");
      }
    });
  }
}
