import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {
  laboratoires: any[] = [];
  totalLaboratories = 0;
  activeLaboratories = 0;
  inactiveLaboratories = 0;

  constructor(
    private laboratoireService: LaboratoireService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadLaboratoires();
  }

  ngAfterViewInit(): void {
    // Vérifier si nous sommes dans un environnement client et que le DOM est prêt
    if (typeof document !== 'undefined') {
      setTimeout(() => {
        this.initializeCharts();
      }, 0); // Peut ajuster le délai si nécessaire
    }
  }

  loadLaboratoires(): void {
    this.laboratoireService.getLaboratoires().subscribe((data) => {
      this.laboratoires = data;

      // Calcul des statistiques après la réception des données
      this.totalLaboratories = data.length;
      this.activeLaboratories = data.filter((labo) => labo.statut === 'ACTIF').length;
      this.inactiveLaboratories = data.filter((labo) => labo.statut === 'INACTIF').length;
    });
  }

  initializeCharts(): void {
    const labStatusChartElement = this.renderer.selectRootElement('#labStatusChart', true);
    const labActivationChartElement = this.renderer.selectRootElement('#labActivationChart', true);

    if (labStatusChartElement && labActivationChartElement) {
      // Graphique Statut des laboratoires (Pie Chart)
      new Chart(labStatusChartElement, {
        type: 'pie',
        data: {
          labels: ['Activé', 'Désactivé'],
          datasets: [
            {
              data: [this.activeLaboratories, this.inactiveLaboratories],
              backgroundColor: ['#28a745', '#dc3545'],
            },
          ],
        },
      });

      // Graphique Laboratoires activés par mois (Stacked Bar Chart)
      new Chart(labActivationChartElement, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Activations',
              data: this.getMonthlyActivations(),
              backgroundColor: '#007bff',
            },
            {
              label: 'Désactivations',
              data: this.getMonthlyDeactivations(),
              backgroundColor: '#dc3545',
            },
          ],
        },
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      });
    } else {
      console.error('Canvas elements not found');
    }
  }

  getMonthlyActivations(): number[] {
    const months = new Array(12).fill(0);
    this.laboratoires.forEach((labo) => {
      const activationDate = new Date(labo.dateActivation);
      const month = activationDate.getMonth();
      months[month]++;
    });
    return months;
  }

  getMonthlyDeactivations(): number[] {
    const months = new Array(12).fill(0);
    this.laboratoires.forEach((labo) => {
      const deactivationDate = new Date(labo.dateDesactivation);
      const month = deactivationDate.getMonth();
      months[month]++;
    });
    return months;
  }

  // Graphique avec Line Chart
  initializeLineChart(): void {
    const labActivationLineChartElement = this.renderer.selectRootElement('#labActivationLineChart', true);

    if (labActivationLineChartElement) {
      new Chart(labActivationLineChartElement, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Activations',
              data: this.getMonthlyActivations(),
              borderColor: '#007bff',
              fill: false,
              tension: 0.1,
            },
            {
              label: 'Désactivations',
              data: this.getMonthlyDeactivations(),
              borderColor: '#dc3545',
              fill: false,
              tension: 0.1,
            },
          ],
        },
      });
    }
  }

  // Graphique avec Radar Chart
  initializeRadarChart(): void {
    const labActivationRadarChartElement = this.renderer.selectRootElement('#labActivationRadarChart', true);

    if (labActivationRadarChartElement) {
      new Chart(labActivationRadarChartElement, {
        type: 'radar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Activations',
              data: this.getMonthlyActivations(),
              backgroundColor: '#CC6CE7',
              borderColor: '#0056b3',
              pointBackgroundColor: '#007bff',
              fill: true,
            },
            {
              label: 'Désactivations',
              data: this.getMonthlyDeactivations(),
              backgroundColor: '#CC6CE7',
              borderColor: '#CC6CE7',
              pointBackgroundColor: '#CC6CE7',
              fill: true,
            },
          ],
        },
      });
    }
  }

  // Graphique avec Horizontal Bar Chart
  initializeHorizontalBarChart(): void {
    const labActivationHorizontalBarChartElement = this.renderer.selectRootElement('#labActivationHorizontalBarChart', true);

    if (labActivationHorizontalBarChartElement) {
      new Chart(labActivationHorizontalBarChartElement, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Activations',
              data: this.getMonthlyActivations(),
              backgroundColor: '#007bff',
            },
          ],
        },
        options: {
          indexAxis: 'y',
        },
      });
    }
  }
}
