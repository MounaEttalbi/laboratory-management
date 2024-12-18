import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { AdresseUpdateComponent } from '../../adresse-service/adresse-update/adresse-update.component';
import {AdresseService} from '../../../services/adresse.service';
@Component({
  selector: 'app-contact-update2',
  templateUrl: './contact-update2.component.html',
  styleUrls: ['./contact-update2.component.css'],
})
export class ContactUpdate2Component {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private adresseService: AdresseService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ContactUpdate2Component>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.contactForm = this.fb.group({
      id: [data.id],
      numTel: [data.numTel, [Validators.required]],
      fax: [data.fax, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
    });
  }

  // Mise à jour du contact
  onUpdate(): void {
    if (this.contactForm.valid) {
      const updatedContact = this.contactForm.value;
      const contactId = this.data.id;
      this.contactService.updateContact(contactId, updatedContact).subscribe({
        next: (response) => {
          console.log('Contact mis à jour avec succès', response);
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour', error);
          this.dialogRef.close(false);
        },
      });
    }
  }

  // Annulation
  onCancel(): void {
    this.dialogRef.close(false);
  }

  // Afficher et modifier l'adresse
  viewAndEditContactAdresse(adresseId: number): void {
    if (!adresseId) {
      console.error('ID d\'adresse invalide pour la modification.');
      return;
    }
  
    this.openEditAdresseDialog(adresseId); // Passe directement l'ID au dialogue
  }
  

  // Ouvrir le dialogue pour modifier l'adresse
  openEditAdresseDialog(adresseId: number): void {
    const dialogRef = this.dialog.open(AdresseUpdateComponent, {
      width: '600px',
      data: { adresseId }, // Transmettez uniquement l'ID
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Adresse mise à jour avec succès.');
      } else {
        console.log('Mise à jour annulée.');
      }
    });
  }
  
  
}
