export interface Resultat {
    id: number;
    fkIdExamen: number;
    valeursMesurees: string;
    observations: string;
    commentaires: string;
    status: string;
    rapportPDF?: Blob;  // Le rapport PDF peut être un Blob (binaire)
  }
  