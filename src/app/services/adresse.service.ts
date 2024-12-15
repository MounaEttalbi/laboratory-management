import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Adresse {
  id: number;
  numVoie: string;
  nomVoie: string;
  codePostal: string;
  ville: string;
  commune: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  private apiUrl = 'http://localhost:8090/adresse';

  constructor(private http: HttpClient) {}

  getAllAdresses(): Observable<Adresse[]> {
    return this.http.get<Adresse[]>(`${this.apiUrl}/all`);
  }

  getAdresseById(id: number): Observable<Adresse> {
    return this.http.get<Adresse>(`${this.apiUrl}/${id}`);
  }

  addAdresse(adresse: Omit<Adresse, 'id'>): Observable<Adresse> {
    return this.http.post<Adresse>(`${this.apiUrl}/addAdresse`, adresse);
  }

  updateAdresse(id: number, adresse: Partial<Adresse>): Observable<Adresse> {
    return this.http.put<Adresse>(`${this.apiUrl}/updateAdresse/${id}`, adresse);
  }

  deleteAdresse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteAdresse/${id}`);
  }
}
