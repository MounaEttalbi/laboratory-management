import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Examen } from '../models/examen';  // Assurez-vous d'avoir un modèle 'Examen'

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  private apiUrl = 'http://localhost:8011/api/examens';  // URL de l'API backend

  constructor(private http: HttpClient) { }

  // Récupérer tous les examens
  getAllExamens(): Observable<Examen[]> {
    return this.http.get<Examen[]>(`${this.apiUrl}/all`).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un examen par son ID
  getExamenById(id: number): Observable<Examen> {
    return this.http.get<Examen>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Créer un nouvel examen
  createExamen(examen: Examen): Observable<Examen> {
    return this.http.post<Examen>(this.apiUrl, examen).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour un examen existant
  updateExamen(id: number, examen: Examen): Observable<Examen> {
    return this.http.put<Examen>(`${this.apiUrl}/${id}`, examen).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un examen
  deleteExamen(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Gérer les erreurs HTTP
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue:', error);
    return throwError(() => new Error('Une erreur est survenue. Veuillez réessayer.'));
  }
}
