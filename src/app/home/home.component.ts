import { Component, OnInit } from '@angular/core';
import { LaboratoireService } from '../services/laboratoire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  
})
export class HomeComponent implements OnInit {

  laboratoires: any[] = [];  // Tableau pour stocker les laboratoires
  selectedLabo: any = null;  // Propriété pour le laboratoire sélectionné pour l'édition

  constructor(private laboratoireService: LaboratoireService) { }

  ngOnInit(): void {
    // Récupération des laboratoires au chargement du composant
    this.laboratoireService.getLaboratoires().subscribe(
      (data: any[]) => {
        this.laboratoires = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des laboratoires', error);
      }
    );
  }

  // Méthode pour sélectionner un laboratoire et l'éditer
  editLabo(labo: any): void {
    this.selectedLabo = { ...labo };  // Cloner le laboratoire pour éviter les modifications directes
  }

  // Méthode pour annuler l'édition
  cancelEdit(): void {
    this.selectedLabo = null;  // Réinitialiser la sélection
  }

  // Méthode pour soumettre les modifications
  onSubmit(): void {
    if (this.selectedLabo) {
      this.laboratoireService.modifierLaboratoire(this.selectedLabo).subscribe(
        (response: any) => {
          console.log('Laboratoire mis à jour avec succès');
          this.selectedLabo = null;  // Réinitialiser la sélection après la soumission
        },
        (error: any) => {
          console.error('Erreur lors de la mise à jour du laboratoire', error);
        }
      );
    }
  }
  
}
