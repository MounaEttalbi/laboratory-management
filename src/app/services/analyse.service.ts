import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyseDto } from '../../app/models/AnalyseDto';
import { analyse } from '../models/analyse';

@Injectable({
  providedIn: 'root',
})
export class AnalyseService {
  private apiUrl = 'http://localhost:8889/ANALYSE-SERVICE/api/analyses/addAnalyse';  // Update with the actual API URL

  constructor(private http: HttpClient) {}

  // Method to send a POST request with the AnalyseDto
  addAnalyse(analyse: AnalyseDto): Observable<void> {
    return this.http.post<void>(this.apiUrl, analyse);
  }
  createAnalyse(analyseData: any): Observable<any> {
    return this.http.post(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/addAnalyse',
      analyseData
    );
  }
  
  getAnalyses(): Observable<analyse> {
    return this.http.get<analyse>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/listAnalyses'
    );
  }
  getAnalysesByUser(username:string): Observable<analyse> {
    return this.http.get<analyse>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/listAnalysesByUser/'+username
    );
  }
  
  getAnalysesByNom(nom: string): Observable<analyse[]> {
    return this.http.get<analyse[]>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/getByNom/' + nom
    );
  }
  getAnalysesByType(type: string): Observable<analyse[]> {
    return this.http.get<analyse[]>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/getByType/' + type
    );
  }
  deleteAnalyse(analyse: analyse): Observable<any> {
    return this.http.delete<any>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/deleteAnalyse/' +
        analyse.id
    );
  }
  
  updateAnalyse(analyse: analyse): Observable<any> {
    console.log(analyse.id);
    return this.http.post<any>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/updateAnalyse',
      analyse
    );
  }
  getAnalyseById(analysisId: number): Observable<analyse> {
    return this.http.get<analyse>(
      'http://localhost:8888/ANALYSE-SERVICE/api/analyses/' + analysisId
    );
  }

  



}
