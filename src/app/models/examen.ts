export interface Examen {
    id: number;
    fkNumDossier: number;
    fkIdEpreuve: number;
    fkIdTestAnalyse: number;
    date: string;  // Utilisez `string` si vous récupérez la date en format ISO
    status: string;
    commentaires: string;
    nom: string;
}
  
  