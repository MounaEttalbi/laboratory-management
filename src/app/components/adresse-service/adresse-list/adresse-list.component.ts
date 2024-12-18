import { Component, OnInit } from '@angular/core';
import { AdresseService } from '../../../services/adresse.service';
import { MatDialog } from '@angular/material/dialog';
import { AdresseAddComponent } from '../adresse-add/adresse-add.component';
import { AdresseUpdateComponent } from '../adresse-update/adresse-update.component';
import { AdresseDeleteComponent } from '../adresse-delete/adresse-delete.component';
import { Observable } from 'rxjs';

interface Adresse {
  id: number;
  numVoie: string;
  nomVoie: string;
  codePostal: string;
  ville: string;
  commune: string;
}

@Component({
  selector: 'app-adresse-list',
  templateUrl: './adresse-list.component.html',
  styleUrls: ['./adresse-list.component.scss'],
})
export class AdresseListComponent implements OnInit {
  adresses: Adresse[] = []; 
  filteredAdresses: Adresse[] = [];
  searchTerm: string = '';

  constructor(private adresseService: AdresseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAdresses();
  }

  loadAdresses(): void {
    this.adresseService.getAllAdresses().subscribe((data: Adresse[]) => {
      this.adresses = data;
      this.filteredAdresses = data; 
    });
  }

  filterAdresses(): void {
    this.filteredAdresses = this.adresses.filter(adresse =>
      adresse.ville.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openAddAdresseDialog(): void {
    const dialogRef = this.dialog.open(AdresseAddComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAdresses(); // Recharger la liste après ajout
      }
    });
  }

  openUpdateAdresseDialog(id: number): void {
    const dialogRef = this.dialog.open(AdresseUpdateComponent, {
      width: '600px', // Optionnel, définit la largeur du dialogue
      data: { adresseId: id } // Passez l'ID comme un objet pour une meilleure extensibilité
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadAdresses(); // Recharger la liste si l'utilisateur a validé la mise à jour
      } else {
        console.log('Modification annulée.');
      }
    });
  }
  

  // Ouvrir le dialogue de suppression avec l'ID de l'adresse
  openDeleteAdresseDialog(id: number): void {
    const dialogRef = this.dialog.open(AdresseDeleteComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Adresse supprimée');
        this.loadAdresses();  // Recharger les adresses après la suppression
      } else {
        console.log('Suppression annulée');
      }
    });
  }
}
