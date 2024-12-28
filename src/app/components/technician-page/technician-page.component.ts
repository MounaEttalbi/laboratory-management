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
  
  selectSection(section: string) {
    this.selectedSection = section;
  }

  confirmLogout() {
    this.showConfirmation = true;
  }

  cancelLogout() {
    this.showConfirmation = false;
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
