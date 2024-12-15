import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.css']
})
export class EditLaboratoryComponent implements OnInit {
  @Input() laboratoireId: number = 2; // ID par défaut si non fourni
  @Output() laboratoryUpdated = new EventEmitter<void>(); // Événement après mise à jour

  laboratoire = {
    id: 0,
    nom: '',
    nrc: '',
    statut: '',
    dateActivation: '',
    logo: '' as string | null // Stocke l'URL ou null
  };

  constructor(
    private laboratoireService: LaboratoireService,
    private router: Router,
    public dialogRef: MatDialogRef<EditLaboratoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Récupération des données via le dialog
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.laboratoireId = this.data.id;
      this.getLaboratoireById(this.laboratoireId); // Charger les données
    }
  }

  // Récupérer les données du laboratoire par ID
  getLaboratoireById(id: number): void {
    this.laboratoireService.getLaboratoireById(id).subscribe({
      next: (response) => {
        this.laboratoire = response;
        this.laboratoire.dateActivation = this.formatDateForInput(this.laboratoire.dateActivation);
      },
      error: (error) => {
        console.error("Erreur lors de la récupération du laboratoire :", error);
        alert("Erreur lors de la récupération du laboratoire");
      }
    });
  }

  // Gestion du changement de fichier pour le logo
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      const fileName = file.name; // Récupère le nom du fichier

      // Concatène "assets/" avec le nom du fichier
      this.laboratoire.logo = `assets/${fileName}`;
      console.log("Chemin généré pour le logo :", this.laboratoire.logo);
    }
  }

   // Ouvrir la fenêtre de sélection de fichier lorsque l'image du logo est cliquée
   triggerFileInput(): void {
    document.getElementById('logo-input')?.click();
  }
  // Formater une date pour un champ `date` HTML
  formatDateForInput(date: string | null): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error('Format de date invalide:', date);
      return '';
    }
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Mise à jour des données du laboratoire
  updateLaboratoire(): void {
    const data = {
      id: this.laboratoire.id,
      nom: this.laboratoire.nom,
      nrc: this.laboratoire.nrc,
      statut: this.laboratoire.statut,
      logo: this.laboratoire.logo,
      dateActivation: this.laboratoire.dateActivation
        ? new Date(this.laboratoire.dateActivation).toISOString().split('T')[0]
        : null
    };

    this.laboratoireService.updateLaboratoire(this.laboratoire.id, data).subscribe({
      next: () => {
        this.laboratoryUpdated.emit();
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du laboratoire:', error);
        alert('Erreur lors de la mise à jour du laboratoire');
      }
    });
  }
}
