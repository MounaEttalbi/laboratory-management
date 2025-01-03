
  export interface TestAnalyse {
    id: number; // Optionnel car généré automatiquement
    fkIdAnalyse: number; // Clé étrangère vers AnalyseTable
    nomTest: string; // Nom du test
    sousEpreuve: string; // Sous-épreuve associée au test
    intervalMinDeReference: number; // Intervalle minimum de référence
    intervalMaxDeReference: number; // Intervalle maximum de référence
    uniteDeReference: string; // Unité de référence (mg/dL, %, etc.)
    details: string; // Détails supplémentaires sur le test
  }
  