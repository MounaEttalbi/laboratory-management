import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selectedSection: string = 'statistics'; // Section initiale vide
  showConfirmation: boolean = false; // Variable pour afficher/masquer la confirmation

  constructor(private router: Router) {}

  selectSection(section: string): void {
    this.selectedSection = section;
    console.log('Section sélectionnée:', this.selectedSection);
  }

  // Afficher le message de confirmation
  confirmLogout(): void {
    this.showConfirmation = true;
  }

  // Annuler la déconnexion
  cancelLogout(): void {
    this.showConfirmation = false; // Masquer le message de confirmation
  }

  // Effectuer la déconnexion
  logout(): void {
    // Logique pour supprimer les informations de session (si nécessaire)
    sessionStorage.removeItem('user'); // Exemple pour supprimer l'utilisateur de session

    // Redirection vers la page de login
    this.router.navigate(['/login']);
  }
}
