import { Component, Output, EventEmitter } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css']
})
export class ExamenAddComponent {
  examen: Examen = {
    date: '',
    status: '',
    commentaires: '',
    id: 0,
    nom: ''
  };
  @Output() closeModal = new EventEmitter<void>();

  constructor(private examenService: ExamenService) {}

  // Méthode pour ajouter un examen
  addExamen(): void {
    this.examenService.createExamen(this.examen).subscribe(
      (newExamen) => {
        console.log('Examen ajouté', newExamen);
        this.closeModal.emit(); // Fermer la modale après l'ajout
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'examen', error);
      }
    );
  }

  // Méthode pour fermer la modale
  close(): void {
    this.closeModal.emit();
  }
}
