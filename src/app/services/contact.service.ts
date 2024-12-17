import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id: number;
  fkIdLaboratoire: number;
  fkIdAdresse: number;
  numTel: string;
  fax: string;
  email: string;
  laboratoryName: string;  // Nom du laboratoire
  adresse: string;         // Adresse formatée
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private apiUrl = 'http://localhost:8055/contact';  // URL de l'API backend

  // Définir les en-têtes HTTP
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  // Récupérer tous les contacts
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/all`, { headers: this.headers });
  }

  // Récupérer un contact par son ID
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  // Ajouter un nouveau contact
  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.apiUrl}/addContact`, contact, { headers: this.headers });
  }

  // Mettre à jour un contact
  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/updateContact/${id}`, contact, { headers: this.headers });
  }


  // Supprimer un contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteContact/${id}`, { headers: this.headers });
  }
  // Récupérer des contacts par ID de laboratoire
getContactsByLaboratoryId(fkIdLaboratoire: number): Observable<Contact[]> {
  return this.http.get<Contact[]>(`${this.apiUrl}/labo/${fkIdLaboratoire}`, { headers: this.headers });
}

}
