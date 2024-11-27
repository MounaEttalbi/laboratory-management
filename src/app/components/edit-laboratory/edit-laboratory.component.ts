import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LaboratoireService } from '../../services/laboratoire.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.css']
})
export class EditLaboratoryComponent implements OnInit {
  editLabForm!: FormGroup;
  labId!: number;
  showEditForm: boolean = true; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService,
    public dialogRef: MatDialogRef<EditLaboratoryComponent>,
    public router: Router,
    private snackBar: MatSnackBar,
    
  ) {this.labId = data.id;  // Récupération de l'ID depuis le dialogue
    console.log('ID reçu pour l\'édition:', this.labId); }

    ngOnInit(): void {
      // Récupérer l'ID depuis l'argument `data` injecté par MAT_DIALOG_DATA
      this.labId = this.data.id;
      console.log('ID reçu pour l\'édition:', this.labId);
    
      // Initialisation du formulaire
      this.editLabForm = this.fb.group({
        nom: ['', Validators.required],
        nrc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
        statut: [0, Validators.required],
        dateActivation: ['', Validators.required],
        logo: [null]
      });
    
      // Vérifier si l'ID est valide
      if (isNaN(this.labId) || this.labId <= 0) {
        this.snackBar.open('ID de laboratoire invalide.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/list-laboratory']);
        return;
      }
    
      // Charger les détails du laboratoire
      this.loadLaboratoire();
    }
    
    

    loadLaboratoire(): void {
      this.laboratoireService.getLaboratoireById(this.labId).subscribe({
        next: (lab) => {
          if (lab) {
            // Convertir le statut en entier
            const statutAsInt = lab.statut === 'INACTIF' ? 1 : 0;
    
            // Convertir la date pour le champ de type `date` en HTML
            const formattedDate = lab.dateActivation ? this.formatDateForInput(lab.dateActivation) : '';
  
            // Patcher les valeurs du formulaire
            this.editLabForm.patchValue({
              nom: lab.nom || '',
              nrc: lab.nrc || '',
              statut: statutAsInt || 0,
              dateActivation: formattedDate,
            });
    
            console.log('Valeurs du formulaire après patchValue:', this.editLabForm.value);
            this.editLabForm.updateValueAndValidity(); // Forcer la mise à jour si nécessaire
          } else {
            this.snackBar.open('Aucun laboratoire trouvé.', 'Fermer', { duration: 3000 });
            this.router.navigate(['/list-laboratory']);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des données:', err);
          this.snackBar.open('Erreur lors du chargement des données.', 'Fermer', { duration: 3000 });
          this.router.navigate(['/list-laboratory']);
        }
      });
    }
    
    // Formater une date au format aaaa-MM-jj (attendu par les champs HTML5 `date`)
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
    
    

  

  // Gestion du fichier logo
  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.editLabForm.patchValue({ logo: file });
    }
  }

  // Soumettre les modifications
  onSubmit(): void {
    // Récupérer les valeurs du formulaire
    const updatedLab = this.editLabForm.value;
  
    // Envoyer la requête POST pour mettre à jour les données
    this.laboratoireService.updateLaboratoire(this.labId, updatedLab).subscribe({
      next: () => {
        this.snackBar.open('Laboratoire mis à jour avec succès.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/list-laboratory']);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 3000 });
      }
    });
  }
  
}
