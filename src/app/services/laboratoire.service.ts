import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LaboratoireService {
<<<<<<< HEAD
  private apiUrl = 'http://localhost:8089/laboratory/all';  // URL pour récupérer tous les laboratoires
  private addUrl = 'http://localhost:8089/laboratory/ajouterLaboratoire'; // URL pour ajouter un laboratoire
  private deleteUrl = 'http://localhost:8089/laboratory/supprimerLabo';  // URL pour supprimer un laboratoire
=======
  // URL de base pour le service des laboratoires
  private baseUrl = 'http://localhost:8089/laboratory'; 
>>>>>>> 37304cd38e5005a23021bec9556bccaaa885f87b

  constructor(private http: HttpClient) {}

  // Récupérer la liste des laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  // Ajouter un laboratoire
  addLaboratoire(laboratoire: any): Observable<any> {
<<<<<<< HEAD
    // Supprimez les en-têtes personnalisés et laissez Angular gérer automatiquement le type de contenu
    return this.http.post(`${this.addUrl}`, laboratoire);}
  
  // Méthode pour supprimer un laboratoire
=======
    return this.http.post<any>(`${this.baseUrl}/ajouterLaboratoire`, laboratoire);
  }

  // Supprimer un laboratoire
>>>>>>> 37304cd38e5005a23021bec9556bccaaa885f87b
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
<<<<<<< HEAD
    const urlGet = `http://localhost:8089/laboratory/${id}`;
    return this.http.get<any>(urlGet);
=======
    return this.http.get<any>(`${this.baseUrl}/${id}`);
>>>>>>> 37304cd38e5005a23021bec9556bccaaa885f87b
  }
}
