import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Resultat } from '../models/resultat.model';

@Injectable({
  providedIn: 'root',
})
export class ResultatService {

  private apiUrl = 'http://localhost:8022/api/resultats'; // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Ajouter un résultat
  addResultat(resultat: Resultat): Observable<Resultat> {
    return this.http.post<Resultat>(this.apiUrl, resultat);
  }

  // Mettre à jour un résultat
  updateResultat(id: number, resultat: Resultat): Observable<Resultat> {
    return this.http.put<Resultat>(`${this.apiUrl}/${id}`, resultat);
  }

  // Supprimer un résultat
  deleteResultat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Obtenir tous les résultats
  getAllResultats(): Observable<Resultat[]> {
    return this.http.get<Resultat[]>(this.apiUrl);
  }

  // Obtenir un résultat par ID
  getResultatById(id: number): Observable<Resultat> {
    return this.http.get<Resultat>(`${this.apiUrl}/${id}`);
  }

  // Générer le PDF du rapport de résultat
  generateRapportPDF(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/rapport/${id}`, {
      responseType: 'blob',
    });
  }

  // Mettre à jour le statut d'un résultat
  updateStatus(id: number, status: string): Observable<Resultat> {
    return this.http.put<Resultat>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

  
}
