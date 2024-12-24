import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dossier } from '../models/dossier.model'; // Importer le modèle Dossier

@Injectable({
    providedIn: 'root'
  })
  export class DossierService {
  
    private apiUrl = 'http://localhost:8091/api/dossiers';  // URL du backend
  
    constructor(private http: HttpClient) { }
  
    // Méthode pour récupérer tous les dossiers
    getAllDossiers(): Observable<Dossier[]> {
      return this.http.get<Dossier[]>(this.apiUrl);
    }
    getDossierById(numDossier: number): Observable<Dossier> {
      return this.http.get<Dossier>(`${this.apiUrl}/${numDossier}`);
    }
    
  
    // Méthode pour créer un dossier
    createDossier(dossier: Dossier): Observable<Dossier> {
      return this.http.post<Dossier>(this.apiUrl, dossier);
    }

     // Méthode pour supprimer un dossier
  deleteDossier(numDossier: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${numDossier}`);
  }

  updateDossier(dossier: Dossier): Observable<Dossier> {
    const url = `${this.apiUrl}/${dossier.numDossier}`;
    return this.http.put<Dossier>(url, dossier);
  }
  }
  