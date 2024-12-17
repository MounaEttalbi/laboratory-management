import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddLaboratoryComponent } from '../add-laboratory/add-laboratory.component';
import { DeleteLaboratoryComponent } from '../delete-laboratory/delete-laboratory.component';
import { EditLaboratoryComponent } from '../edit-laboratory/edit-laboratory.component';
import { ContactDetailsComponent } from '../contact-details/contact-details.component'; // Importer le composant modale
@Component({
  selector: 'app-list-laboratories',
  templateUrl: './list-laboratories.component.html',
  styleUrls: ['./list-laboratories.component.css'] // Correction ici (pluriel)
})
export class ListLaboratoriesComponent implements OnInit {

  laboratoires: any[] = []; // Tableau pour stocker les laboratoires
  selectedLabo: any = null; // Propriété pour le laboratoire sélectionné pour l'édition
  searchQuery: string = '';
  filteredLaboratories: any[] = []; // Tableau filtré des laboratoires

  contacts: any[] = [];  // Stockage des contacts du laboratoire
  constructor(
    private laboratoireService: LaboratoireService,
    private dialog: MatDialog,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadLaboratoires();
  }

  loadLaboratoires(): void {
    // Récupération des laboratoires au chargement du composant
    this.laboratoireService.getLaboratoires().subscribe(
      (data: any[]) => {
        this.laboratoires = data;
        this.filteredLaboratories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des laboratoires', error);
      }
    );
  }

  openAddLaboratory(): void {
    console.log('Ajouter un laboratoire');
    const dialogRef = this.dialog.open(AddLaboratoryComponent, {
      width: '500px'
    });
    dialogRef.afterClosed().subscribe((result) => {
        this.loadLaboratoires(); // Rafraîchir la liste
    });
  }

  openDeleteDialog(laboId: number): void {
    const dialogRef = this.dialog.open(DeleteLaboratoryComponent, {
      width: '400px',
      data: { id: laboId }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.loadLaboratoires(); // Chargez les laboratoires
      }
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(EditLaboratoryComponent, {
      width: '400px',
      data: { id: id }  // Passez l'ID du laboratoire ici
    });
    dialogRef.componentInstance.laboratoryUpdated.subscribe(() => {
      // Rafraîchir la liste après la mise à jour
      this.loadLaboratoires();
    });
  }
  
  filterLaboratories(): void {
    const query = this.searchQuery.toLowerCase().trim();  // Convertir la requête en minuscule et enlever les espaces
    console.log('Recherche en cours avec le texte :', query);  // Log pour déboguer
    
    // Si la requête est vide, afficher tous les laboratoires
    if (!query) {
      this.filteredLaboratories = this.laboratoires;
    } else {
      this.filteredLaboratories = this.laboratoires.filter(labo => 
        labo.nom.toLowerCase().includes(query) || labo.statut.toLowerCase().startsWith(query)
      );
    }
    
    console.log('Laboratoires filtrés :', this.filteredLaboratories);  // Log pour vérifier le résultat
  }
  
   // Méthode pour afficher les contacts du laboratoire
   viewLaboratoryContacts(laboId: number): void {
    this.contactService.getContactsByLaboratoryId(laboId).subscribe(contacts => {
      this.contacts = contacts;
      this.openContactDialog(contacts);  // Ouvre un dialogue avec les informations des contacts
    });
  }

  // Ouvrir un dialogue avec les contacts du laboratoire
  openContactDialog(contacts: any[]): void {
    this.dialog.open(ContactDetailsComponent, {
      data: { contacts: contacts }
    });
  }
}
