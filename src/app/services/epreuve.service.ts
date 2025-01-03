import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpreuveService {

  private apiUrl = 'http://localhost:8888/EPREUVE-SERVICE/api/epreuves';  // Update with the actual API URL
  
    constructor(private http: HttpClient) {}
     createEpreuve(epreuveData: any): Observable<any> {
        return this.http.post(
          this.apiUrl+'/addEpreuve',
          epreuveData
        );
      }

       getEpreuvesByAnalyse(idAnalyse:number): Observable<void> {
          return this.http.get<void>(
            'http://localhost:8888/EPREUVE-SERVICE/api/epreuves/listEpreuvesByAnalyse/'+idAnalyse
          );
        }
}
