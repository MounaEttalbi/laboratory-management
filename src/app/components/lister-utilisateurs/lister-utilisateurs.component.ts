import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { MatTableDataSource } from '@angular/material/table';
import { Utilisateur } from '../../models/Utilisateur';

import { MatDialog } from '@angular/material/dialog';
import { AjouterUtilisateurComponent } from '../ajouter-utilisateur/ajouter-utilisateur.component';

@Component({
  selector: 'app-lister-utilisateurs',
  templateUrl: './lister-utilisateurs.component.html',
  styleUrls: ['./lister-utilisateurs.component.css']
})
export class ListerUtilisateursComponent implements OnInit {
  utilisateurs: any[] = [];
  filteredUtilisateurs!: MatTableDataSource<Utilisateur>;
  displayedColumns: string[] = ['username', 'nomComplet', 'email', 'role', 'Action'];

  constructor(private utilisateurService: UtilisateurService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.utilisateurService.getUtilisateurs().subscribe(
      (data) => {
        console.log("g3 g3",data)
        this.utilisateurs = data.map((utilisateur) => ({
          ...utilisateur,
          nomComplet: `${utilisateur.firstName} ${utilisateur.lastName}` // Concatène prénom et nom
        }));
        this.filteredUtilisateurs = new MatTableDataSource(this.utilisateurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.filteredUtilisateurs) {
      this.filteredUtilisateurs.filter = filterValue.trim().toLowerCase();
    }
  }

  onAddUser() {
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.utilisateurs.push({
          ...result,
          nomComplet: `${result.firstName} ${result.lastName}` // Met à jour nom complet
        });
        this.filteredUtilisateurs = new MatTableDataSource(this.utilisateurs);
      }
    });
  }

  onEditUser(utilisateur: Utilisateur): void {
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent, {
      width: '500px',
      data: utilisateur
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mettez à jour l'utilisateur modifié ici
      }
    });
  }

  onDeleteUser(utilisateur: any): void {
    this.utilisateurService.deleteUtilisateur(utilisateur.username).subscribe({
      next: () => {
        this.utilisateurs = this.utilisateurs.filter(u => u.username !== utilisateur.username);
        this.filteredUtilisateurs = new MatTableDataSource(this.utilisateurs);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l’utilisateur :', err);
      }
    });
  }
  getRoleStyle(role: string) {
    switch (role) {
      case 'CHERCHEUR':
        return { 'background-color': '#4caf50', 'padding': '4px 8px', 'border-radius': '12px', 'color': 'white', 'font-weight': 'bold' };
      case 'TECHNICIEN':
        return { 'background-color': '#ff9800', 'padding': '4px 8px', 'border-radius': '12px', 'color': 'white', 'font-weight': 'bold' };
      case 'ADMINISTRATEUR':
        return { 'background-color': '#2196f3', 'padding': '4px 8px', 'border-radius': '12px', 'color': 'white', 'font-weight': 'bold' };
      default:
        return {}; // Si le rôle est inconnu, ne pas appliquer de style
    }
  }
  
  
}
