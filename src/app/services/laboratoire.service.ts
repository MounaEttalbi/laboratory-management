import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaboratoireService {
  // URL de base pour le service des laboratoires
  private baseUrl = 'http://localhost:8089/laboratory'; 

  constructor(private http: HttpClient) {}

  // Récupérer la liste des laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Ajouter un laboratoire
  addLaboratoire(laboratoire: any): Observable<any> {
    // Supprimez les en-têtes personnalisés et laissez Angular gérer automatiquement le type de contenu
    return this.http.post(`${this.baseUrl}/ajouterLaboratoire`, laboratoire);}
  

  // Supprimer un laboratoire
  deleteLaboratoire(id: number): Observable<any> {
    const url = `${this.baseUrl}/supprimerLabo/${id}`;
    console.log('URL générée pour suppression :', url); // Log de l'URL utilisée
    return this.http.delete<any>(url);
  }

  // Mettre à jour un laboratoire
  updateLaboratoire(id: number, updatedLab: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/modifierLabo/${id}`, updatedLab);
  }

  // Récupérer un laboratoire par ID
  getLaboratoireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
