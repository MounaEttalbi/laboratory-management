import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../../services/profil.service';
import { ExtendedKeycloakProfile } from '../../services/profil.service'; // Importer l'interface étendue

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  userInfo = { nom: '', prenom: '' };
  profil: ExtendedKeycloakProfile | null = null;
  roles: string[] = [];  // Tableau pour stocker les rôles de l'utilisateur


  selectedSection: string = 'statistics';
 

  showConfirmation = false;  // Variable pour afficher/masquer la confirmation

  constructor(private router: Router, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.profilService.getProfil().subscribe((profile: any) => {
      console.log("mn side",profile)
      this.profil = profile;
      if (this.profil) {
        this.userInfo.nom = this.profil.lastName || '';
        this.userInfo.prenom = this.profil.firstName || '';
        this.roles = this.profil.realmAccess?.roles || []; // Récupère les rôles
        console.log('Roles:', this.roles);
      }
    });
  }

  selectSection(section: string): void {
    this.selectedSection = section;
    console.log('Section sélectionnée:', this.selectedSection);
  }

  confirmLogout(): void {
    this.showConfirmation = true;
  }

  cancelLogout(): void {
    this.showConfirmation = false;
  }

  logout(): void {
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
