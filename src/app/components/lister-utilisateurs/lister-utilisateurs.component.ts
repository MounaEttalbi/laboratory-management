import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { MatTableDataSource } from '@angular/material/table';
import { Role, Utilisateur } from '../../models/Utilisateur';

import { MatDialog } from '@angular/material/dialog';
import { AjouterUtilisateurComponent } from '../ajouter-utilisateur/ajouter-utilisateur.component';

@Component({
  selector: 'app-lister-utilisateurs',
  templateUrl: './lister-utilisateurs.component.html',
  styleUrls: ['./lister-utilisateurs.component.css']
})
export class ListerUtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  filteredUtilisateurs!: MatTableDataSource<Utilisateur>;
  displayedColumns: string[] = ['nomComplet', 'email', 'numTel', 'profession', 'Action'];


  constructor(private utilisateurService: UtilisateurService, private dialog: MatDialog) { }
  

  // Méthode pour supprimer un utilisateur
  onDeleteUser(utilisateur: any): void {
    console.log('Suppression de l’utilisateur :', utilisateur);
    this.utilisateurService.deleteUtilisateur(utilisateur.username).subscribe({
        next: () => {
            console.log('Utilisateur supprimé avec succès.');
            // Ajoutez ici des actions supplémentaires, comme rafraîchir la liste des utilisateurs
        },
        error: (err) => {
            console.error('Erreur lors de la suppression de l’utilisateur :', err);
            // Gérer les erreurs, par exemple afficher une notification
        }
    });
}

  ngOnInit(): void {
    console.log('Utili start:');
    // Récupération des utilisateurs
    this.utilisateurService.getUtilisateurs().subscribe(
      (data) => {
        console.log('Utilisateurs récupérés:', data);
        this.utilisateurs = data;  // Affecte les données récupérées
        // Initialise filteredUtilisateurs avec les données récupérées
        this.filteredUtilisateurs = new MatTableDataSource(this.utilisateurs);
      },
      (error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
      }
    );
  }

  // Méthode pour filtrer les utilisateurs
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.filteredUtilisateurs) {
      this.filteredUtilisateurs.filter = filterValue.trim().toLowerCase();
    }
  }

  // Action pour ajouter un utilisateur
  onAddUser() {
    console.log('lwl');
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent, {
      width: '600px'
    });
    console.log('wst');
    dialogRef.afterClosed().subscribe((result: Utilisateur) => {
      if (result) {
        console.log('lwlResut',result);
        this.utilisateurs.push(result); // Ajouter le nouvel utilisateur à la liste
        this.filteredUtilisateurs = new MatTableDataSource(this.utilisateurs); // Mettre à jour la table
      }
    });
  }

  // Action pour modifier un utilisateur
  onEditUser(utilisateur: any): void {
    console.log("voir",utilisateur)
    const dialogRef = this.dialog.open(AjouterUtilisateurComponent, {
      width: '500px',
      data: utilisateur  // Passer les données de l'utilisateur à éditer
    });

    dialogRef.afterClosed().subscribe(result => {
     
    });
  }
}
