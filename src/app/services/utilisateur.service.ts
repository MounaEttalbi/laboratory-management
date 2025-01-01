import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InscriptionUtilisateur, Utilisateur } from '../models/Utilisateur';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:8888/SERVICE-UTILISATEUR/users'; // Remplacez par votre URL d'API

  constructor(private http: HttpClient) { }
  createUser(userRegistration: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, userRegistration);
  }

  sendVerificationEmail(userId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userId}/send-verify-email`, {});
  }

  changePassword(userId: string, password: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/change-password`, { password });
  }
  // Méthode pour récupérer les laboratoires
  getUtilisateurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+'/all');
  }

 
  ajouterUtilisateur(utilisateur:InscriptionUtilisateur): Observable<InscriptionUtilisateur> {
    const url = `http://localhost:8888/SERVICE-UTILISATEUR/users`; // Endpoint de votre contrôleur Spring
console.log("nchof",url)
    return this.http.post<InscriptionUtilisateur>(url, utilisateur);
  }
  deleteUtilisateur(username: string): Observable<void> {
    const url = `${this.apiUrl}/${username}`;
    console.log("URL générée pour suppression :", url); // Log de l'URL utilisée
    return this.http.delete<void>(`${this.apiUrl}/${username}`);
  }
  updateUtilisateur(username:string ,user: any):  Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${username}`,user);
  }


}
