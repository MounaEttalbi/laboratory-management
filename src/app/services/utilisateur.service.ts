import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscriptionUtilisateur, Utilisateur } from '../models/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8889/SERVICE-UTILISATEUR'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les laboratoires
  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/utilisateurs');
  }

 
  ajouterUtilisateur(utilisateur:InscriptionUtilisateur): Observable<InscriptionUtilisateur> {
    const url = `http://localhost:8182/ajouUtilisateur`; // Endpoint de votre contrôleur Spring
console.log("nchof",url)
    return this.http.post<InscriptionUtilisateur>(url, utilisateur);
  }


}
