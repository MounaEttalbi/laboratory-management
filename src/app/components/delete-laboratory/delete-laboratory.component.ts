import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LaboratoireService } from '../../services/laboratoire.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-laboratory',
  templateUrl: './delete-laboratory.component.html',
  styleUrls: ['./delete-laboratory.component.css']
})
export class DeleteLaboratoryComponent {
  constructor(
    private laboratoireService: LaboratoireService,
    private snackBar: MatSnackBar, // Injectez MatSnackBar
    public dialogRef: MatDialogRef<DeleteLaboratoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Réception de l'ID
  ) {}

  deleteLaboratoire(): void {
    this.laboratoireService.deleteLaboratoire(this.data.id).subscribe({
      next: () => {
        this.snackBar.open('Laboratoire supprimé avec succès.', 'Fermer', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression du laboratoire :', err);
        this.snackBar.open('Échec de la suppression du laboratoire.', 'Fermer', { duration: 3000 });
      }
    });
  }}