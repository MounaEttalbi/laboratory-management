export interface Dossier {
    numDossier?: number;
    date: string;  // Utilisation de string pour la date (au format ISO-8601)
    fkEmailUtilisateur: string;
    fkIdPatient: string;
    status: string;
  }
  