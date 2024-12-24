import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DossierService } from '../../../services/dossier.service';

@Component({
  selector: 'app-dossier-delete',
  templateUrl: './dossier-delete.component.html',
  styleUrls: ['./dossier-delete.component.css']
})
export class DossierDeleteComponent {

  constructor(
    private dossierService: DossierService,
    public dialogRef: MatDialogRef<DossierDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numDossier: number } // Reçoit l'ID du dossier
  ) {}

  // Méthode pour confirmer la suppression
  onDelete(): void {
    this.dossierService.deleteDossier(this.data.numDossier).subscribe(
      () => {
        console.log(`Dossier ${this.data.numDossier} supprimé avec succès`);
        this.dialogRef.close(true); // Ferme la boîte de dialogue avec succès
      },
      (error) => {
        console.error('Erreur lors de la suppression du dossier:', error);
      }
    );
  }

  // Méthode pour annuler et fermer la boîte de dialogue
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
