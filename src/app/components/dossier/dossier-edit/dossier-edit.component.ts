import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DossierService } from '../../../services/dossier.service';
import { Dossier } from '../../../models/dossier.model';

@Component({
  selector: 'app-dossier-edit',
  templateUrl: './dossier-edit.component.html',
  styleUrls: ['./dossier-edit.component.css']
})
export class DossierEditComponent implements OnInit {
  dossier: Dossier = {
    numDossier: undefined,
    date: '',
    fkEmailUtilisateur: '',
    fkIdPatient: '',
    status: 'Active'
  };

  constructor(
    private dossierService: DossierService,
    public dialogRef: MatDialogRef<DossierEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numDossier: number }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.numDossier) {
      this.loadDossier(this.data.numDossier);
    }
  }
  

  loadDossier(numDossier: number): void {
    this.dossierService.getDossierById(numDossier).subscribe({
      next: (response) => {
        console.log('Dossier récupéré :', response);
        this.dossier = response;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du dossier :', err);
      }
    });
  }
  

  updateDossier(): void {
    this.dossierService.updateDossier(this.dossier).subscribe({
      next: () => {
        this.dialogRef.close(true); // Fermez le dialogue et retournez un indicateur de succès
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du dossier :', err);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close(); // Fermez le dialogue sans sauvegarder
  }
}
