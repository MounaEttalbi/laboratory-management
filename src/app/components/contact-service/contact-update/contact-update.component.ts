import { Component, Inject ,OnInit,Input,Output,EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from '../../../services/contact.service';
import {Contact} from '../../../services/contact.service';
import { forkJoin } from 'rxjs';

import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.scss']
})

export class ContactUpdateComponent implements OnInit {
  
  contactForm!: FormGroup; // Formulaire principal
  contacts: Contact[];    // Liste des contacts passés au composant

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { contacts: Contact[] }
  ) {
    this.contacts = data.contacts;
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      contacts: this.fb.array(this.contacts.map(contact => this.createContactForm(contact)))
    });
  }

  createContactForm(contact: Contact): FormGroup {
    return this.fb.group({
      id: [contact.id],
      numTel: [contact.numTel, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      fax: [contact.fax],
      email: [contact.email, [Validators.required, Validators.email]],
      fkIdAdresse: [contact.fkIdAdresse, Validators.required],
    });
  }

  get contactsArray(): FormArray {
    return this.contactForm.get('contacts') as FormArray;
  }

  saveContacts(): void {
    const updatedContacts = this.contactForm.value.contacts; // Récupérer les données du formulaire
  
    const updateRequests = updatedContacts.map((contact: Contact) =>
      this.contactService.updateContact(contact.id, contact)
    );
  
    // Exécuter toutes les mises à jour et attendre leur achèvement
    forkJoin(updateRequests).subscribe({
      next: () => {
        console.log('Tous les contacts ont été mis à jour avec succès.');
        this.dialogRef.close(true); // Fermer la boîte de dialogue
      },
      error: (err: any) => {
        console.error('Erreur lors de la mise à jour des contacts :', err);
      }
    });
  }

  closeForm() {
    this.dialogRef.close(true);// Si c'est ce que tu utilises pour contrôler l'affichage du formulaire
  }
  
}