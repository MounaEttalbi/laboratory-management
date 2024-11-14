import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {
  private apiUrl = 'http://localhost:8889/PROJETLIBRE/api/laboratoires/all';  // URL pour récupérer tous les laboratoires
  private addUrl = 'http://localhost:8889/PROJETLIBRE/api/laboratoires/ajouterLaboratoire'; // URL pour ajouter un laboratoire

  constructor(private http: HttpClient) { }

  // Récupérer la liste des laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un laboratoire avec FormData
  addLaboratoire(laboratoireData: FormData): Observable<any> {
    return this.http.post<any>(this.addUrl, laboratoireData);
  }
}
