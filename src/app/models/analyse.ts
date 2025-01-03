export interface analyse {
    id: number;
    laboratoire: string;
    nom: string;
    description: string;
    type: string;
    epreuves?: { nom: string; description: string }[]; 
  }

    