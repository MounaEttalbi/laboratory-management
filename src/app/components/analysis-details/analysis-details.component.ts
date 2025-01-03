import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { analyse } from '../../models/analyse';
import { EpreuveService } from '../../services/epreuve.service';
@Component({
  selector: 'app-analysis-details',
  templateUrl: './analysis-details.component.html',
  styleUrls: ['./analysis-details.component.css'],
})
export class AnalysisDetailsComponent implements OnInit {
  @Input() analysis!: analyse;
  @Output() close = new EventEmitter<void>();
  @Output() addEpreuve = new EventEmitter<void>();

  epreuves: any[] = [];
  isModalOpen = false;

  constructor(private epreuveService: EpreuveService) {}

  ngOnInit(): void {
    this.fetchEpreuves();
  }

  fetchEpreuves(): void {
    if (this.analysis.id) {
      this.epreuveService.getEpreuvesByAnalyse(this.analysis.id).subscribe(
        (data: any) => {
          this.epreuves = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des épreuves:', error);
        }
      );
    }
  }

  closeModal(): void {
    this.close.emit();
  }

  deleteEpreuve(index: number): void {
    this.epreuves.splice(index, 1);
  }

  addNewEpreuve(): void {
    this.isModalOpen = true;
    this.addEpreuve.emit();
  }
}
