import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { TestAnalyseService } from '../../services/test-analyse.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-technicien',
  templateUrl: './dashboard-technicien.component.html',
  styleUrls: ['./dashboard-technicien.component.scss']
})
export class DashboardTechnicienComponent implements OnInit, AfterViewInit {
  totalExamens = 0;
  totalTests = 0;
  totalExamensTermines = 0;
  totalExamensEnCours = 0;
  totalExamensAnnules = 0;

  @ViewChild('examensChart') examensChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('testsChart') testsChartRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private examenService: ExamenService,
    private testAnalyseService: TestAnalyseService
  ) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    // Générer les graphiques après le rendu du DOM
    setTimeout(() => {
      this.loadStatistics();
    });
  }

  private loadStatistics() {
    // Récupération des examens
    this.examenService.getAllExamens().subscribe(examens => {
      console.log(examens); // Vérifiez les données ici
      this.totalExamens = examens.length;
      this.totalExamensTermines = examens.filter(e => e.status.trim().toUpperCase() === 'TERMINÉ').length;
      this.totalExamensEnCours = examens.filter(e => e.status.trim().toUpperCase() === 'EN COURS').length;
      this.totalExamensAnnules = examens.filter(e => e.status.trim().toUpperCase() === 'ANNULÉ').length;
  
    

      this.generateExamensChart();
    });

    // Récupération des tests
    this.testAnalyseService.getAllTestAnalyses().subscribe(tests => {
      this.totalTests = tests.length;
      this.generateTestsChart(tests);
    });
  }

  private generateExamensChart() {
    const data = {
      labels: ['Terminés', 'En cours', 'Annulés'],
      datasets: [{
        label: 'Répartition des Examens',
        data: [
          this.totalExamensTermines,
          this.totalExamensEnCours,
          this.totalExamensAnnules
        ],
        backgroundColor: ['#4caf50', '#ff9800', '#f44336']
      }]
    };

    new Chart(this.examensChartRef.nativeElement, {
      type: 'doughnut',
      data
    });
  }

  private generateTestsChart(tests: any[]) {
    const data = {
      labels: tests.map(t => t.nomTest),
      datasets: [{
        label: 'Valeurs de Référence',
        data: tests.map(t => t.intervalMaxDeReference - t.intervalMinDeReference),
        backgroundColor: '#2196f3'
      }]
    };

    new Chart(this.testsChartRef.nativeElement, {
      type: 'bar',
      data
    });
  }
}
