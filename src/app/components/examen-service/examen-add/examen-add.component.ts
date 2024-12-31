import { Component, EventEmitter, Output } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';
import Swal from 'sweetalert2'; // Assurez-vous d'installer SweetAlert2 si vous l'utilisez

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css']
})
export class ExamenAddComponent {
 
  examen: Examen = {
    id: 0,
    nom: '',
    date: '',
    status: 'en cours',
    commentaires: '',
    fkNumDossier: 0,
    fkIdEpreuve: 0,
    fkIdTestAnalyse: 0
  };

  @Output() closeModalEvent = new EventEmitter<void>(); // Événement pour fermer la modale
 

  constructor(private examenService: ExamenService) {}

  // Méthode pour ajouter un examen
  addExamen(): void {
    this.examenService.createExamen(this.examen).subscribe({
      next: (data) => {
        console.log('Examen ajouté avec succès:', data);
        // Affichage de la boîte de dialogue de succès
        Swal.fire({
          icon: 'success',
          title: 'Examen ajouté avec succès',
          text: 'L\'examen a été ajouté avec succès.',
          confirmButtonText: 'OK'
        }).then(() => {
          // Fermer la modale après confirmation
          this.closeModal();
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'examen:', err);
        // Optionnel : afficher une alerte d'erreur
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout de l\'examen.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  // Méthode pour fermer la modale
  closeModal(): void {
    this.closeModalEvent.emit(); // Émettre l'événement pour fermer la modale
    console.log('Événement de fermeture de la modale émis');
  }

  onCancel(): void {
    this.closeModalEvent.emit(); // Notifie le parent de fermer la modale
    console.log('Événement de fermeture de la modale émis');
  }  
}
