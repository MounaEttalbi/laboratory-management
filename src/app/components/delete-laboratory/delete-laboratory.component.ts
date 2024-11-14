import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LaboratoireService } from '../../services/laboratoire.service';

@Component({
  selector: 'app-delete-laboratory',
  templateUrl: './delete-laboratory.component.html',
  styleUrls: ['./delete-laboratory.component.css']
})
export class DeleteLaboratoryComponent {
  
  constructor(
    private laboratoireService: LaboratoireService,
    private dialogRef: MatDialogRef<DeleteLaboratoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Inject the laboratory ID to delete
  ) {}

  deleteLaboratoire() {
    this.laboratoireService.deleteLaboratoire(this.data.id).subscribe({
      next: (response) => {
        console.log('Laboratoire supprimé avec succès:', response);
        this.dialogRef.close(); // Succès
      },
      error: (error) => {
        console.error("Erreur lors de la suppression du laboratoire : ", error);
        alert("Erreur lors de la suppression du laboratoire : " + error.message);
      }
    });
  }
  

  closeDialog() {
    this.dialogRef.close(false); // Close dialog without action
  }
}
