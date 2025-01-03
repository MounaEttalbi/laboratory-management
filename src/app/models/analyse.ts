export interface analyse {
    id?: number | null;
    laboratoire: string;
    nom: string;
    description: string;
    type: string;
    epreuves?: { nom: string; description: string }[]; 
  }

    