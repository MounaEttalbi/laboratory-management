import { Component,OnInit } from '@angular/core';
import { LaboratoireService } from '../../services/laboratoire.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-laboratories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-laboratories.component.html',
  styleUrl: './list-laboratories.component.css'
})
export class ListLaboratoriesComponent implements OnInit {

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
}
