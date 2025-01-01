export interface Utilisateur {
  cin: string;
  email: string;
  nomComplet: string;
 numTel: string;
 signature:Blob;
 role :Role;

}
export enum Role {
  CHERCHEUR = 'CHERCHEUR',
  TECHNICIEN = 'TECHNICIEN',
  ADMINISTRATEUR = 'ADMINISTRATEUR',
    // Ajoutez d'autres rôles si nécessaire
  }
  export interface InscriptionUtilisateur {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  // role :Role;
  password: string;

  
  }
  
