import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExtendedKeycloakProfile, ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-technician-page',
  templateUrl: './technician-page.component.html',
  styleUrls: ['./technician-page.component.scss']
})
export class TechnicianPageComponent {
  selectedSection: string = 'profil'; // Section par défaut
  showConfirmation: boolean = false;
 userInfo = { nom: '', prenom: '' };
    profil: ExtendedKeycloakProfile | null = null;
    roles: string[] = [];  // Tableau pour stocker les rôles de l'utilisateur
  

  constructor(private router: Router, private profilService: ProfilService) {}
  
  selectSection(section: string): void {
    this.selectedSection = section;
    if (section === 'logout') {
      this.showConfirmation = true; // Active l'affichage de confirmation
    } else {
      this.showConfirmation = false; // Désactive si une autre section est sélectionnée
    }
  }
  

  confirmLogout() {
    this.showConfirmation = true;
  }

  cancelLogout() {
    this.showConfirmation = false;
  }

  logout() {
    // Suppression des informations utilisateur (sessionStorage, localStorage, etc.)
    sessionStorage.clear();
    localStorage.clear();

    // Redirection vers la page de connexion
    this.router.navigate(['/login']);

    this.showConfirmation = false;
  }
}
