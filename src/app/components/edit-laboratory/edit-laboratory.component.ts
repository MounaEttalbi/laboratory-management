import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LaboratoireService } from '../../services/laboratoire.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-laboratory',
  templateUrl: './edit-laboratory.component.html',
  styleUrls: ['./edit-laboratory.component.css']
})
export class EditLaboratoryComponent implements OnInit {
  editLabForm!: FormGroup;
  labId!: number;

  constructor(
    private fb: FormBuilder,
    private laboratoireService: LaboratoireService,
    private route: ActivatedRoute,
    public router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.editLabForm = this.fb.group({
      nom: ['', Validators.required],
      nrc: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      statut: ['', Validators.required],
      date_activation: ['', Validators.required],
      logo: [null]
    });

    // Récupérer l'ID depuis l'URL
    this.labId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadLaboratoire();
  }

  // Charger les détails du laboratoire
  loadLaboratoire(): void {
    this.laboratoireService.getLaboratoireById(this.labId).subscribe({
      next: (lab) => {
        this.editLabForm.patchValue({
          nom: lab.nom,
          nrc: lab.nrc,
          statut: lab.statut,
          date_activation: lab.dateActivation
        });
      },
      error: () => {
        this.snackBar.open('Erreur lors du chargement des données.', 'Fermer', { duration: 3000 });
      }
    });
  }

  // Gestion du fichier logo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.editLabForm.patchValue({ logo: file });
    }
  }

  // Soumettre les modifications
  onSubmit(): void {
    if (this.editLabForm.invalid) {
      return;
    }

    const updatedLab = this.editLabForm.value;

    this.laboratoireService.updateLaboratoire(this.labId, updatedLab).subscribe({
      next: () => {
        this.snackBar.open('Laboratoire mis à jour avec succès.', 'Fermer', { duration: 3000 });
        this.router.navigate(['/list_laboratory']);
      },
      error: () => {
        this.snackBar.open('Erreur lors de la mise à jour.', 'Fermer', { duration: 3000 });
      }
    });
  }
}
