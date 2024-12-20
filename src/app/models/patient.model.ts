export interface Patient {
  idPatient:number;
  nomcomplet: string;
  dateNaissance: string; // Format: "YYYY-MM-DD"
  lieuDeNaissance: string;
  sexe: string;
  typePieceIdentite: string;
  numPieceIdentite: string;
  adresse: string;
  numTel: string;
  email: string;
  visible_pour: string;
}
