import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LaboratoireService {

  private apiUrl = 'http://localhost:8080/api/laboratoires/all';  // URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les laboratoires
  getLaboratoires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
