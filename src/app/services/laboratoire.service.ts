import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8889/PROJETLIBRE/api/laboratoires/all';  // URL pour récupérer tous les laboratoires
  private addUrl = 'http://localhost:8889/PROJETLIBRE/api/laboratoires/ajouterLaboratoire'; // URL pour ajouter un laboratoire
  private deleteUrl = 'http://localhost:8889/PROJETLIBRE/api/laboratoires/supprimerLabo';  // URL pour supprimer un laboratoire

  constructor(private http: HttpClient) { }

  // Récupérer la liste des laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Ajouter un laboratoire avec FormData
  addLaboratoire(laboratoire: any): Observable<any> {
    // Supprimez les en-têtes personnalisés et laissez Angular gérer automatiquement le type de contenu
    return this.http.post<any>(this.addUrl, laboratoire);
  }
  
  // Méthode pour supprimer un laboratoire
  deleteLaboratoire(id: number): Observable<void> {
    const url = `${this.deleteUrl}/${id}`;
    console.log("URL générée pour suppression :", url); // Log de l'URL utilisée
    return this.http.delete<void>(url);
  }
  
  updateLaboratoire(id: number, laboratoire: any): Observable<any> {
    const url = `http://localhost:8889/PROJETLIBRE/api/laboratoires/modifierLabo/${id}`;
    return this.http.put<any>(url, laboratoire);
  }
  getLaboratoireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  
}
