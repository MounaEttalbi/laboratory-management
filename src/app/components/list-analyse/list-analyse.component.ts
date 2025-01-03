import { Component, OnInit } from '@angular/core';
import { AnalyseService } from '../../services/analyse.service';
import { analyse } from '../../models/analyse';
//import { Router } from '@angular/router'; // Pour la navigation lors de la modification
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ExtendedKeycloakProfile, ProfilService } from '../../services/profil.service';

@Component({
  selector: 'app-list-analyse',
  templateUrl: './list-analyse.component.html',
  styleUrls: ['./list-analyse.component.css'],
})
export class ListAnalyseComponent implements OnInit {
  username:string="";
  profil: ExtendedKeycloakProfile | null = null;
  deleteAnalyse(analyse: analyse) {
    this.analyseService.deleteAnalyse(analyse).subscribe(
      (data: any) => {
        // Initialisation de filteredAnalyses
        console.log('Analyse supprimee');
        this.analyseService.getAnalyses().subscribe(
          (data: any) => {
            this.analyses = data;
            this.filteredAnalyses = data; // Initialisation de filteredAnalyses
            console.log('Analyses rÃ©cupÃ©rÃ©es:', this.analyses);
          },
          (error) => {
            console.error(
              'Erreur lors de la rÃ©cupÃ©ration des analyses:',
              error
            );
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la ruppression', error);
      }
    );
  }
  constructor(private analyseService: AnalyseService, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.profilService.getProfil().subscribe((profile) => {
      this.profil = profile;

      if (this.profil) {
        this.username=this.profil.username || '';  
      }
    });
    this.fetchAnalyses();
  }

  // Tableau des analyses rÃ©cupÃ©rÃ©es
  analyses: analyse[] = [ ];

  // Tableau filtrÃ© des analyses en fonction de la recherche
  filteredAnalyses: analyse[] = [];
  selectedType: string = '';
  dropdownOpen: boolean = false;
  // Texte de recherche
  searchText: string = '';
  searchTerm = new FormControl('');
  filteredOptions!: Observable<any>;

  options = ['Type1', 'Type2', 'Type3', 'Type4'];

  // Variable qui dÃ©termine si la liste est visible ou non
  isListVisible = false;

  // MÃ©thode pour afficher/masquer la liste
  toggleList() {
    this.isListVisible = !this.isListVisible;
  }

  // MÃ©thode pour gÃ©rer la sÃ©lection d'une option
  selectOption(option: string) {
    console.log('Option sÃ©lectionnÃ©e:', option);
    this.isListVisible = false;
    this.analyseService.getAnalysesByType(option).subscribe(
      (data: any) => {
        this.analyses = data;
        this.filteredAnalyses = data; // Initialisation de filteredAnalyses
        console.log('Analyses rÃ©cupÃ©rÃ©es:', this.analyses);
      },
      (error) => {
        console.error('Erreur lors de la rÃ©cupÃ©ration des analyses:', error);
      }
    );
  }
  // MÃ©thode pour rÃ©cupÃ©rer les analyses depuis le service
  fetchAnalyses(): void {
    this.analyseService.getAnalysesByUser(this.username).subscribe(
      (data: any) => {
        console.log("analysat ",data)
        this.analyses = data;
        this.filteredAnalyses = data; // Initialisation de filteredAnalyses
        console.log('Analyses rÃ©cupÃ©rÃ©es:', this.analyses);
      },
      (error) => {
        console.error('Erreur lors de la rÃ©cupÃ©ration des analyses:', error);
      }
    );
  }
  searchAnalyses(): void {
    const searchValue = this.searchTerm.value;
    if (searchValue) {
      this.analyseService.getAnalysesByNom(searchValue).subscribe(
        (data: analyse[]) => {
          this.analyses = data;
          console.log(this.filteredAnalyses);
        },
        (error) => {
          console.error('Erreur lors de la recherche des analyses:', error);
        }
      );
    } else {
      this.filteredAnalyses = this.analyses; // Affiche toutes les analyses si le champ de recherche est vide
    }
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    console.log('hbet');
  }
  // MÃ©thode de filtrage des analyses
  filterAnalyses() {
    if (this.selectedType) {
      this.filteredAnalyses = this.analyses.filter(
        (analysis) => analysis.type === this.selectedType
      );
    } else {
      this.filteredAnalyses = [...this.analyses]; // RÃ©initialise si aucun type n'est sÃ©lectionnÃ©
    }

    // Ferme le menu aprÃ¨s sÃ©lection
    this.dropdownOpen = false;
  }

  newAnalysis = { name: '', patient: '', date: '', status: 'Pending' };
  isModalOpen = false;
  isModalEditOpen = false;
  selectedAnalysis!: analyse;
  // MÃ©thode pour ouvrir la modal
  openAddAnalysisModal(): void {
    console.log('open');
    this.isModalOpen = true;
  }

  openeditAnalysisModal(analysis: analyse): void {
    this.selectedAnalysis = analysis; // VÃ©rifiez que l'ID est bien assignÃ©
    this.isModalEditOpen = true; // Ouvre la modal
  }

  // MÃ©thode pour fermer la modal
  closeModal(): void {
    this.isModalOpen = false;
  }

  applyFilter() {
    console.log('Filtrer par type:', this.selectedType);
    // ImplÃ©mentez ici la logique pour appliquer le filtre sur vos analyses
    // Par exemple, vous pouvez filtrer la liste des analyses en fonction du type sÃ©lectionnÃ©
  }
  isDetailsModalOpen = false; // To control the visibility of the details modal


  // Method to open the details modal
  openAnalysisDetailsModal(analysis: analyse): void {
    this.selectedAnalysis = analysis; // Assign the selected analysis
    this.isDetailsModalOpen = true; // Open the modal
  }

  // Method to close the details modal
  closeDetailsModal(): void {
    this.isDetailsModalOpen = false; // Close the modal
  }

  // Method to add a new epreuve
  addEpreuve(): void {
    // Logic to add a new epreuve, either open a new modal or trigger another method
    console.log('Adding new epreuve');
  }
}