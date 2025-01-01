import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';

@Component({
  selector: 'app-examen-update',
  templateUrl: './examen-update.component.html',
  styleUrls: ['./examen-update.component.css']
})
export class ExamenUpdateComponent implements OnInit {
  @Input() examen!: Examen; // Examen reçu en entrée
  @Output() closeModal = new EventEmitter<void>(); // Événement pour fermer la modale

  constructor(private examenService: ExamenService) {}

  ngOnInit(): void {}

  updateExamen(): void {
    this.examenService.updateExamen(this.examen.id, this.examen).subscribe(() => {
      alert('Examen mis à jour avec succès');
      this.closeModal.emit(); // Notifie le parent de fermer la modale
    });
  }

  onCancel(): void {
    this.closeModal.emit(); // Notifie le parent de fermer la modale
  }
  
}
