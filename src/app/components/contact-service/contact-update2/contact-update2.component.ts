import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';

@Component({
  selector: 'app-contact-update2',
  standalone: false,
  
  templateUrl: './contact-update2.component.html',
  styleUrl: './contact-update2.component.css'
})
export class ContactUpdate2Component {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactUpdate2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      id :[data.id],
      numTel: [data.numTel, [Validators.required]],
      fax: [data.fax, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]]
    });
  }

  // Méthode de mise à jour
  onUpdate(): void {
    if (this.contactForm.valid) {
      const updatedContact = this.contactForm.value;
      const contactId = this.data.id;  // Utilisation de l'ID du contact passé dans les données
      this.contactService.updateContact(contactId, updatedContact).subscribe(
        response => {
          console.log('Contact mis à jour avec succès', response);
          this.dialogRef.close(true);  // Ferme le dialogue et signale la mise à jour réussie
        },
        error => {
          console.error('Erreur lors de la mise à jour', error);
          this.dialogRef.close(false);  // Si erreur, ferme le dialogue et signale l'échec
        }
      );
    }
  }

  // Méthode pour fermer la fenêtre de dialogue sans mise à jour
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
