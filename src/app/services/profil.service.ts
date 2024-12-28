import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';// Importez votre interface personnalisée
import { BehaviorSubject, Observable } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { Console } from 'console';
export interface ExtendedKeycloakProfile extends KeycloakProfile {
  realmAccess?: {
    roles: string[];
  };}
@Injectable({
  providedIn: 'root',
})
export class ProfilService {
  private profileSubject: BehaviorSubject<ExtendedKeycloakProfile | null> = new BehaviorSubject<ExtendedKeycloakProfile | null>(null);

  constructor(public keycloakService: KeycloakService) {}

  public getProfil(): Observable<ExtendedKeycloakProfile | null> {
    if (this.keycloakService.isLoggedIn()) {
      this.keycloakService.loadUserProfile().then((profile) => {
        const token = this.keycloakService.getKeycloakInstance().tokenParsed; // Récupère les informations du token
        const roles = token?.realm_access?.roles || []; // Récupère les rôles du token

        const extendedProfile: ExtendedKeycloakProfile = {
          ...profile,  // Utilise le profil de Keycloak
          realmAccess: { roles }  // Ajoute les rôles dans realmAccess
        };

        this.profileSubject.next(extendedProfile);  // Émet le profil étendu
      });
    }
    console.log("o nchofo chkon",this.profileSubject.asObservable())
    return this.profileSubject.asObservable(); // Retourne l'Observable du profil étendu
  }
}
