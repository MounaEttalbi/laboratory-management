import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Resultat } from '../../../models/resultat.model';
import { ResultatService } from '../../../services/resultat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultat-update',
  templateUrl: './resultat-update.component.html',
  styleUrls: ['./resultat-update.component.scss']
})
export class ResultatUpdateComponent implements OnInit {
  @Input() resultat!: Resultat; // Résultat à mettre à jour
  @Output() closeModal = new EventEmitter<void>(); // Événement pour fermer la modale

  constructor(private resultatService: ResultatService, private router: Router) {}

  ngOnInit(): void {}

  // Fermer la modale
  close(): void {
    this.closeModal.emit(); // Emit l'événement pour fermer la modale
  }

  onCancel(): void {
    this.closeModal.emit(); // Notifie le parent de fermer la modale
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.resultat) {
      this.resultatService.updateResultat(this.resultat.id, this.resultat).subscribe({
        next: (updatedResultat) => {
          console.log('Résultat mis à jour avec succès:', updatedResultat);
          this.close(); // Fermer la modale après la mise à jour
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du résultat:', err);
        },
      });
    }
  }
}