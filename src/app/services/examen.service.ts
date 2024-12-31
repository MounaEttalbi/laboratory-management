import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from '../models/examen';  // Assurez-vous d'avoir un modèle 'Examen'

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = 'http://localhost:8011/api/examens';  // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les examens
  getAllExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un examen par son ID
  getExamenById(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.apiUrl}/${id}`);
  }

  // Créer un nouvel examen
  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen);
  }

  // Mettre à jour un examen existant
  updateExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/${id}`, examen);
  }

  // Supprimer un examen
  deleteExamen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
