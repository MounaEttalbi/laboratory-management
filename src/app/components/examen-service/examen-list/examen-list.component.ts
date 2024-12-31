import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {
  examens: Examen[] = [];
  searchTerm: string = '';
  selectedExamen: Examen | null = null; // Examen actuellement sélectionné
  showAddModal: boolean = false;
  
  
  constructor(private examenService: ExamenService) {}

  ngOnInit(): void {
    this.loadExamens();
  }

  loadExamens(): void {
    this.examenService.getAllExamens().subscribe((data) => {
      this.examens = data;  // On charge tous les examens
    });
  }

  deleteExamen(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet examen ?')) {
      this.examenService.deleteExamen(id).subscribe(() => {
        this.examens = this.examens.filter(examen => examen.id !== id);  // Suppression de l'examen de la liste
      }, error => {
        console.error('Erreur lors de la suppression', error);
      });
    }
  }

  filterExamens(): Examen[] {
    if (!this.searchTerm) {
      return this.examens;
    }
    return this.examens.filter(examen =>
      examen.nom.toLowerCase().includes(this.searchTerm.toLowerCase())  // Filtrage des examens par nom
    );
  }

  openUpdateModal(examen: Examen): void {
    this.selectedExamen = { ...examen };  // Clone l'examen sélectionné pour éviter les modifications directes
  }

  closeUpdateModal(): void {
    this.selectedExamen = null;  // Réinitialise l'examen sélectionné
  }

  // Ouvrir la modale d'ajout
  openAddExamenModal(): void {
    this.showAddModal = true;
  }

  closeAddExamenModal(): void {
    this.showAddModal = false;
  }
}
