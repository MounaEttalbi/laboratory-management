import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { ContactUpdate2Component } from '../contact-update2/contact-update2.component';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';

interface Contact {
  id: number;
  numTel: string;
  fax: string;
  email: string;
  laboratoryName: string;  // Nom du laboratoire
  //adresse: string;         // Adresse formatée
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = []; 
  filteredContacts: Contact[] = [];
  searchTerm: string = '';

  constructor(private contactService: ContactService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe((data: Contact[]) => {
      console.log(data);
      this.contacts = data;
      this.filteredContacts = data;
    });
  }

  filterContacts(): void {
    this.filteredContacts = this.contacts.filter(contact =>
      contact.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(ContactAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContacts(); // Recharger la liste après ajout
      }
    });
  }

  openUpdateContactDialog(contact: Contact): void {
    const dialogRef = this.dialog.open(ContactUpdate2Component, {
      data: contact
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadContacts(); // Recharger la liste après mise à jour
      }
    });
  }

  // Ouvrir le dialogue de suppression avec l'ID du contact
  openDeleteContactDialog(id: number): void {
    const dialogRef = this.dialog.open(ContactDeleteComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Contact supprimé');
        this.loadContacts();  // Recharger les contacts après la suppression
      } else {
        console.log('Suppression annulée');
      }
    });
  }

}
