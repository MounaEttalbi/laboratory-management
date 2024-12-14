import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';  // Importez MAT_DIALOG_DATA

@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.css']
})
export class EditLaboratoryComponent implements OnInit {
  @Input() laboratoireId: number = 2;  // ID du laboratoire à modifier (initialisé à une valeur par défaut)
  @Output() laboratoryUpdated = new EventEmitter<void>(); // Événement émis après la mise à jour

  laboratoire = {
    id: 0,
    nom: '',
    nrc: '',
    statut: '',
    dateActivation: '',
    logo: null as File | null
  };

  constructor(
    private laboratoireService: LaboratoireService,
    private router: Router,
    public dialogRef: MatDialogRef<EditLaboratoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Récupérer l'ID du laboratoire passé dans data
  ) {}

  ngOnInit(): void {
    if (this.data.id) {
      this.laboratoireId = this.data.id;  // Assignez l'ID récupéré depuis 'data'
      this.getLaboratoireById(this.laboratoireId); // Récupérer les données du laboratoire
    }
  }

  // Méthode pour récupérer les données du laboratoire
  getLaboratoireById(id: number): void {
    this.laboratoireService.getLaboratoireById(id).subscribe({
      next: (response) => {
        this.laboratoire = response; // Assigner les données récupérées au modèle
        // Formater la date de l'objet laboratoire avant de l'afficher
        this.laboratoire.dateActivation = this.formatDateForInput(this.laboratoire.dateActivation);
     
       },
      error: (error) => {
        console.error("Erreur lors de la récupération du laboratoire : ", error);
        alert("Erreur lors de la récupération du laboratoire");
      }
    });
  }

  // Gestion du changement de fichier pour mettre à jour le logo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.laboratoire.logo = file;
    }
  }


  formatDateForInput(date: string | null): string {
    if (!date) {
      return '';
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      console.error('Format de date invalide:', date);
      return '';
    }
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format attendu par les champs HTML5 `date`
  }

  
  // Méthode pour mettre à jour le laboratoire
  updateLaboratoire() {
    const data = {
      id: this.laboratoire.id,
      nom: this.laboratoire.nom,
      logo: this.laboratoire.logo, // Assurez-vous que le logo est soit un fichier soit null
      nrc: this.laboratoire.nrc,
      statut: this.laboratoire.statut,
      // Vérifiez et convertissez la date en ISO 8601 si elle est valide
      dateActivation: this.laboratoire.dateActivation ? new Date(this.laboratoire.dateActivation).toISOString().split('T')[0] : null
    };
  
    this.laboratoireService.updateLaboratoire(this.laboratoire.id, data).subscribe({
      next: (response) => {
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
