import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EpreuveService } from '../../services/epreuve.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-epreuve',
  templateUrl: './add-epreuve.component.html',
  styleUrls: ['./add-epreuve.component.css']
})
export class AddEpreuveComponent {
  @Output() close = new EventEmitter<void>();
  @Input() idAnalyse?: number;
  errorMessage: string="";
  successMessage: string="";
    constructor(
      private epreuveService: EpreuveService
    ) {}

  epreuveData = {
    id: '',
    nom:'',
    description: '',
    idAnalyse: 0
  };

  closeF(): void {
    this.close.emit();
  }
  save(): void {
    console.log("iddddddddd", this.idAnalyse)
    if(this.idAnalyse){
      this.epreuveData.idAnalyse=this.idAnalyse;
      console.log("eprv ",this.epreuveData);
       this.epreuveService
              .createEpreuve(this.epreuveData)
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
                    new this.close(); // Appelle la mÃ©thode de fermeture de la modale
                  }, 2000); // DÃ©lai de 2 secondes
                }
              });
    }

   // this.epreuveData.idAnalyse = this.idAnalyse;
    this.close.emit();
  }
}
