import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TestAnalyse {
  id: number;
  nomTest: string;
  sousEpreuve: string;
  intervalMinDeReference: number;
  intervalMaxDeReference: number;
  details: string;
  fkIdAnalyse: number;
  uniteDeReference: string;
}

@Injectable({
  providedIn: 'root'
})
export class TestAnalyseService {
  private apiUrl = 'http://localhost:8044/api/testanalyses';

  // Définir les en-têtes HTTP
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Récupérer tous les TestAnalyse
  getAllTestAnalyses(): Observable<TestAnalyse[]> {
    return this.http.get<TestAnalyse[]>(`${this.apiUrl}/all`);
  }

  // Récupérer un TestAnalyse par ID
  getTestAnalyseById(id: number): Observable<TestAnalyse> {
    return this.http.get<TestAnalyse>(`${this.apiUrl}/${id}`);
  }

  // Ajouter un TestAnalyse
  addTestAnalyse(testAnalyse: TestAnalyse): Observable<TestAnalyse> {
    return this.http.post<TestAnalyse>(this.apiUrl, testAnalyse, {
      headers: this.headers,
    });
  }

  // Mettre à jour un TestAnalyse
  updateTestAnalyse(id: number, testAnalyse: TestAnalyse): Observable<TestAnalyse> {
    return this.http.put<TestAnalyse>(`${this.apiUrl}/update/${id}`, testAnalyse, {
      headers: this.headers,
    });
  }

  // Supprimer un TestAnalyse
  deleteTestAnalyse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, {
      headers: this.headers,
    });
  }
}
