import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../../../services/contact.service';



@Component({
  selector: 'app-contact-delete',
  standalone: false,
  
  templateUrl: './contact-delete.component.html',
  styleUrl: './contact-delete.component.css'
})
export class ContactDeleteComponent {

  constructor(
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any  // Données envoyées (ici l'ID de l'adresse)
  ) {}

  // Méthode pour fermer la fenêtre de dialogue sans suppression
  onCancel(): void {
    this.dialogRef.close(false);  // Ferme le dialogue et envoie "false"
  }

  // Méthode pour procéder à la suppression
  onDelete(): void {
    const id = this.data.id;  // L'ID de l'adresse à supprimer, passé depuis le composant appelant
    this.contactService.deleteContact(id).subscribe(
      response => {
        console.log('Adresse supprimée avec succès', response);
        this.dialogRef.close(true);  // Ferme le dialogue et envoie "true" pour signaler la suppression réussie
      },
      error => {
        console.error('Erreur lors de la suppression', error);
        this.dialogRef.close(false);  // Si une erreur se produit, ferme le dialogue et envoie "false"
      }
    );
  }
}


