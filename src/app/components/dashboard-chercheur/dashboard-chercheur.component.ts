import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Chart from 'chart.js/auto';

interface Dossier {
  numDossier?: number;
  date: string;
  fkEmailUtilisateur: string;
  fkIdPatient: string;
  status: string; // 'Active', 'Archived', 'Pending'
}

@Component({
  selector: 'app-dashboard-chercheur',
  templateUrl: './dashboard-chercheur.component.html',
  styleUrls: ['./dashboard-chercheur.component.css']
})
export class DashboardChercheurComponent implements OnInit {
  @ViewChild('examensChart') examensChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('testsChart') testsChartRef!: ElementRef<HTMLCanvasElement>;

  apiUrl = 'http://localhost:8091/api/dossiers';
  dossiers: Dossier[] = [];
  totalDossiers = 0;
  activeDossiers = 0;
  archivedDossiers = 0;
  pendingDossiers = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllDossiers().subscribe((dossiers) => {
      this.dossiers = dossiers;
      this.calculateStats();
      this.renderCharts();
    });
  }

  getAllDossiers(): Observable<Dossier[]> {
    return this.http.get<Dossier[]>(this.apiUrl);
  }

  calculateStats(): void {
    this.totalDossiers = this.dossiers.length;
    this.activeDossiers = this.dossiers.filter(d => d.status === 'Active').length;
    this.archivedDossiers = this.dossiers.filter(d => d.status === 'Archived').length;
    this.pendingDossiers = this.dossiers.filter(d => d.status === 'Pending').length;
  }

  renderCharts(): void {
    // Examens Chart
    new Chart(this.examensChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Active', 'Archived', 'Pending'],
        datasets: [
          {
            data: [this.activeDossiers, this.archivedDossiers, this.pendingDossiers],
            backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
          }
        ]
      }
    });

    // Tests Chart
    new Chart(this.testsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Active', 'Archived', 'Pending'],
        datasets: [
          {
            label: 'Dossiers Status',
            data: [this.activeDossiers, this.archivedDossiers, this.pendingDossiers],
            backgroundColor: ['#36a2eb', '#ff6384', '#ffce56']
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
