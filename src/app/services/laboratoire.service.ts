import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8089/laboratory/all';  // URL pour récupérer tous les laboratoires
=======
  private apiUrl = 'http://localhost:8888/laboratory-service/laboratory/all';  // URL pour récupérer tous les laboratoires
>>>>>>> e10a17c35f9060a1e24d08629b11243ca1da0407
  private addUrl = 'http://localhost:8089/laboratory/ajouterLaboratoire'; // URL pour ajouter un laboratoire
  private deleteUrl = 'http://localhost:8089/laboratory/supprimerLabo';  // URL pour supprimer un laboratoire

  constructor(private http: HttpClient) { }

  // Récupérer la liste des laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Ajouter un laboratoire avec FormData
  addLaboratoire(laboratoire: any): Observable<any> {
    // Supprimez les en-têtes personnalisés et laissez Angular gérer automatiquement le type de contenu
    return this.http.post<any>(this.addUrl, laboratoire,{
    headers: { 'Content-Type': 'application/json' }
  });
}
  
  // Méthode pour supprimer un laboratoire
  deleteLaboratoire(id: number): Observable<any> {
    const url = `${this.deleteUrl}/${id}`;
    console.log("URL générée pour suppression :", url); // Log de l'URL utilisée
    return this.http.delete<any>(url);
  }
  
  updateLaboratoire(id: number, updatedLab: any): Observable<any> {
    const url = `http://localhost:8089/laboratory/modifierLabo/${id}`;
    return this.http.put<any>(url, updatedLab);
  }
  getLaboratoireById(id: number): Observable<any> {
<<<<<<< HEAD
    const urlGet = `http://localhost:8089/laboratory/${id}`;
=======
    const urlGet = `http://localhost:8888/laboratory-service/laboratory/${id}`;
>>>>>>> e10a17c35f9060a1e24d08629b11243ca1da0407
    return this.http.get<any>(urlGet);
  }
  
  
}
