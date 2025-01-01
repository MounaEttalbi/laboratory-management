import { Component, OnInit } from '@angular/core';
import { ExtendedKeycloakProfile, ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit{
  user = {
    username:'',
    firstName: '',
    lastName: '',
    email: '',
    role: '' // Le rôle principal filtré sera affiché ici
  };

  profil: ExtendedKeycloakProfile | null = null;

  // Liste des rôles métier définis dans l'application
  validRoles = ['ADMINISTRATEUR', 'CHERCHEUR', 'TECHNICIEN']; // Liste à adapter en fonction de votre logique métier

  constructor(private profilService: ProfilService) {}

  ngOnInit(): void {
    // Récupérer les informations de profil
    this.profilService.getProfil().subscribe((profile) => {
      this.profil = profile;

      if (this.profil) {
        this.user.firstName = this.profil.firstName || '';
        this.user.lastName = this.profil.lastName || '';
        this.user.email = this.profil.email || '';
        this.user.username=this.profil.username || '';

        // Filtrer les rôles pour ne garder que ceux qui sont dans validRoles
        const filteredRoles = this.profil.realmAccess?.roles.filter((role) =>
          this.validRoles.includes(role)
        );

        // Affecter le premier rôle métier valide, ou une valeur par défaut
        this.user.role = filteredRoles?.[0] || 'Aucun rôle métier attribué';
      }
    });
  }


  /**
   * Fonction pour récupérer les initiales du prénom et du nom
   * @param firstName Prénom
   * @param lastName Nom
   * @returns Initiales
   */
  getInitials(firstName: string, lastName: string): string {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
    return `${firstInitial}${lastInitial}`;
  }
}
