export interface Utilisateur {
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
    cin: string;
    email: string;
    nomComplet: string;
   numTel: string;
   signature:Blob;
   role :Role;
   mdp: string;

  
  }
  
