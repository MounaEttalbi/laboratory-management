import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DossierService } from '../../../services/dossier.service';
import { Dossier } from '../../../models/dossier.model';
import { DossierAddComponent } from '../dossier-add/dossier-add.component';
import { DossierDeleteComponent } from '../dossier-delete/dossier-delete.component';
import { DossierEditComponent } from '../dossier-edit/dossier-edit.component';

@Component({
  selector: 'app-dossier-list',
  templateUrl: './dossier-list.component.html',
  styleUrls: ['./dossier-list.component.css']
})
export class DossierListComponent implements OnInit {

  searchTerm: string = '';
  dossiers: Dossier[] = []; // Données originales
  filteredDossiers: Dossier[] = []; // Données filtrées

  displayedColumns: string[] = ['numDossier', 'date', 'fkEmailUtilisateur', 'fkIdPatient', 'status', 'Actions'];

  constructor(
    private dossierService: DossierService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadDossiers();
  }

  // Charger tous les dossiers
  loadDossiers(): void {
    this.dossierService.getAllDossiers().subscribe((dossiers: Dossier[]) => {
      this.dossiers = dossiers;
      this.filteredDossiers = dossiers; // Initialiser les données filtrées
    });
  }

  // Filtrer les données
  applyFilter() {
    const searchTermLower = this.searchTerm.toLowerCase();
    
    this.filteredDossiers = this.dossiers.filter(dossier =>
      (dossier.numDossier && dossier.numDossier.toString().toLowerCase().includes(searchTermLower)) ||
      (dossier.fkEmailUtilisateur && dossier.fkEmailUtilisateur.toLowerCase().includes(searchTermLower))
    );
  }
  
  openAddDossierDialog(): void {
    const dialogRef = this.dialog.open(DossierAddComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDossiers();
        console.log('Dossier ajouté:', result);
      }
    });
  }

  openDeleteDossierDialog(numDossier: number): void {
    const dialogRef = this.dialog.open(DossierDeleteComponent, {
      width: '450px',
      data: { numDossier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDossiers();
      }
    });
  }

  openEditDossierDialog(numDossier: number): void {
    const dialogRef = this.dialog.open(DossierEditComponent, {
      width: '500px',
      data: { numDossier }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDossiers();
      }
    });
  }
}
