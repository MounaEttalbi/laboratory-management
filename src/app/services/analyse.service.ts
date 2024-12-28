import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalyseDto } from '../../app/models/AnalyseDto';

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
}
