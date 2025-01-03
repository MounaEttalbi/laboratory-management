import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnalyseService } from '../../services/analyse.service';
import { catchError, of } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { analyse } from '../../models/analyse';

@Component({
  selector: 'app-edit-analyse',
  templateUrl: './edit-analyse.component.html',
  styleUrls: ['./edit-analyse.component.css'], // Corrected styleUrl to styleUrls
})
export class EditAnalyseComponent implements OnInit {
  @Input() analysis!: analyse; // Recevoir l'ID de l'analyse
  @Output() close = new EventEmitter<void>(); // Close event to handle modal close
  @Output() refresh = new EventEmitter<void>(); // Event to refresh the list of analyses
  analysisToEdit: any;
  editForm!: FormGroup; // FormGroup for editing the analysis

  errorMessage!: string;

  constructor(
    private analyseService: AnalyseService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    console.log(this.analysis); // Ajoutez un console.log pour vÃ©rifier la valeur
    if (this.analysis !== null) {
      // VÃ©rifiez si les donnÃ©es sont bien assignÃ©es

      // Initialiser le formulaire aprÃ¨s la rÃ©cupÃ©ration des donnÃ©es
      this.editForm = this.fb.group({
        nom: [this.analysis.nom, Validators.required],
        type: [this.analysis.type, Validators.required],
        description: [this.analysis.description, Validators.required],
        laboratoire: [this.analysis.laboratoire, Validators.required],
      });
    }

  
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      // Logique pour mettre Ã  jour l'analyse
      const updatedAnalysis = {
        ...this.analysis,
        ...this.editForm.value,
      };
      this.analyseService.updateAnalyse(updatedAnalysis).subscribe(
        (response) => {
          this.refresh.emit(); // Ã‰mettre l'Ã©vÃ©nement pour rafraÃ®chir la liste des analyses
          this.close.emit(); // Fermer la modale
        },
        (error) => {
          console.error("Erreur lors de la mise Ã  jour de l'analyse:", error);
        }
      );
    }
  }

  // MÃ©thode pour fermer la modale
  onClose(): void {
    this.close.emit(); // Ã‰mettre l'Ã©vÃ©nement pour fermer la modale
  }
}
