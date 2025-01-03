import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnalyseService } from '../../services/analyse.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ExtendedKeycloakProfile, ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.component.html',
  styleUrls: ['./add-analyse.component.css'],
})
export class AddAnalyseComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  analyseForm!: FormGroup;
  errorMessage: string | null = null; // Variable pour stocker les messages d'erreur
  isModalOpen = false;
  successMessage!: string;
  username:string="";
   profil: ExtendedKeycloakProfile | null = null;
  constructor(
    private fb: FormBuilder,
    private analyseService: AnalyseService,
    private profilService: ProfilService
  ) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.analyseForm = this.fb.group({
      nom: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      laboratoire: [''],
    });
    this.profilService.getProfil().subscribe((profile) => {
      this.profil = profile;

      if (this.profil) {
        this.username=this.profil.username || '';  
      }
    });
}

  onSubmit(): void {
    if (this.analyseForm.valid) {
      const analyseData = this.analyseForm.value;
      analyseData.username=this.username;
      console.log("nchifo analyse",analyseData)
      this.successMessage = 'Analyse crÃ©Ã©e avec succÃ¨s';
      this.close.emit();
      this.refresh.emit();
      this.analyseService
        .createAnalyse(analyseData)
        .pipe(
          catchError((error) => {
            this.errorMessage = "Erreur lors de la crÃ©ation de l'analyse.";
            console.error(error);
            return of(null); // Retourne une observable vide pour stopper le flux
          })
        )
        .subscribe((response) => {
          if (response) {
            console.log('Analyse crÃ©Ã©e avec succÃ¨s:', response);
            this.errorMessage = ''; // RÃ©initialise le message d'erreur
            this.successMessage = 'Analyse crÃ©Ã©e avec succÃ¨s !'; // Ajoute un message de succÃ¨s

            // Fermer la modale aprÃ¨s un court dÃ©lai pour afficher le message de succÃ¨s
            setTimeout(() => {
              this.successMessage = ''; // Efface le message de succÃ¨s
              this.onClose(); // Appelle la mÃ©thode de fermeture de la modale
            }, 2000); // DÃ©lai de 2 secondes
          }
        });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs requis.';
    }
  }

  // MÃ©thode pour fermer la modale
  onClose(): void {
    this.close.emit(); // Ã‰met un Ã©vÃ©nement pour le parent
  }
}
