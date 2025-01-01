import { Component, OnInit } from '@angular/core';
import { TestAnalyseService } from '../../../services/test-analyse.service';
import { identity } from 'rxjs';

interface TestAnalyse {
  id: number ;
  nomTest: string;
  sousEpreuve: string;
  intervalMinDeReference: number;
  intervalMaxDeReference: number;
  details: string;
  fkIdAnalyse: number;
  uniteDeReference: string;
}

@Component({
  selector: 'app-test-analyse',
  templateUrl: './test-analyse.component.html',
  styleUrls: ['./test-analyse.component.scss']
})
export class TestAnalyseComponent implements OnInit {
  testAnalyses: TestAnalyse[] = []; // Liste des tests d'analyse
  errorMessage: string = ''; // Message d'erreur en cas de problème
  selectedTestAnalyse: TestAnalyse | null = null; // TestAnalyse sélectionné pour mise à jour

  filteredTestAnalyses: any[] = [];
  searchQuery: string = '';

  isAddFormVisible: boolean = false; // Afficher ou cacher le formulaire d'ajout
  isUpdateFormVisible: boolean = false;
  
  newTestAnalyse: TestAnalyse = { // Modèle de Test Analyse pour ajout
    id: 0,
    nomTest: '',
    sousEpreuve: '',
    intervalMinDeReference: 0,
    intervalMaxDeReference: 0,
    details: '',
    fkIdAnalyse: 0,
    uniteDeReference: ''
  };
 


  constructor(private testAnalyseService: TestAnalyseService) {}

  ngOnInit(): void {
    this.fetchTestAnalyses();
  }

  // Méthode pour récupérer tous les tests d'analyse
  fetchTestAnalyses(): void {
    this.testAnalyseService.getAllTestAnalyses().subscribe({
      next: (data: TestAnalyse[]) => { // Préciser le type de 'data'
        this.testAnalyses = data; // Stocke les résultats dans le tableau testAnalyses
        this.filteredTestAnalyses = data; // Initialiser filteredTestAnalyses avec toutes les données
      
      },
      error: (err) => {
        this.errorMessage = 'Une erreur est survenue lors de la récupération des données.';
        console.error(err); // Affiche l'erreur dans la console pour le débogage
      }
    });
  }

  // Méthode pour rediriger vers une page ou afficher un formulaire de modification
  editTestAnalyse(id: number): void {
    console.log(`Modifier Test Analyse avec ID: ${id}`);
    // Exemple de redirection (désactivé ici) : this.router.navigate(['/edit-test-analyse', id]);
  }

  // Méthode pour supprimer un test d'analyse
  deleteTestAnalyse(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce Test Analyse ?')) {
      this.testAnalyseService.deleteTestAnalyse(id).subscribe({
        next: () => {
          // Mise à jour de la liste après la suppression
          this.testAnalyses = this.testAnalyses.filter(test => test.id !== id);
          alert('Test Analyse supprimé avec succès.');
        },
        error: (err) => {
          this.errorMessage = 'Une erreur est survenue lors de la suppression.';
          console.error(err); // Affiche l'erreur dans la console pour le débogage
        }
      });
    }
  }

  // Méthode pour afficher le formulaire de mise à jour avec les données pré-remplies
  showUpdateForm(test: TestAnalyse): void {
    if (test && test.id) {
      this.selectedTestAnalyse = { ...test }; // Clone l'objet pour éviter de modifier directement
      this.isUpdateFormVisible = true; // Affiche le formulaire de mise à jour
    } else {
      console.error('L\'objet test ou son id est invalide');
    }
  }

 // Méthode pour mettre à jour un Test Analyse
updateTestAnalyse(): void {
  if (this.selectedTestAnalyse && this.selectedTestAnalyse.id !== undefined) {  // Vérification que selectedTestAnalyse n'est pas null et que id est défini
    this.testAnalyseService.updateTestAnalyse(this.selectedTestAnalyse.id, this.selectedTestAnalyse).subscribe({
      next: () => {
        // Mise à jour de la liste avec les nouvelles données
        const index = this.testAnalyses.findIndex(test => test.id === this.selectedTestAnalyse?.id);  // Utilisation de l'opérateur de sécurité '?.' ici
        if (index !== -1) {
          // Assurez-vous que selectedTestAnalyse a toutes les propriétés définies
          this.testAnalyses[index] = { ...this.selectedTestAnalyse } as TestAnalyse; // Force le type si nécessaire
        }
        alert('Test Analyse mis à jour avec succès.');
        this.selectedTestAnalyse = null; // Fermer le formulaire après la mise à jour
      },
      error: (err) => {
        this.errorMessage = 'Une erreur est survenue lors de la mise à jour.';
        console.error(err); // Affiche l'erreur dans la console pour le débogage
      }
    });
  } else {
    console.error('L\'ID du Test Analyse est invalide ou manquant');
    this.errorMessage = 'Le Test Analyse sélectionné est invalide.';
  }
}

  // Méthode pour annuler la mise à jour et fermer le formulaire
  cancelUpdate(): void {
    this.selectedTestAnalyse = null; // Fermer le formulaire
  }

   // Filtrer les tests en fonction de la recherche
   filterTests(): void {
    if (this.searchQuery) {
      this.filteredTestAnalyses = this.testAnalyses.filter(test =>
        test.nomTest.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTestAnalyses = this.testAnalyses;
    }
  }

   // Afficher le formulaire d'ajout
   showAddForm(): void {
    this.isAddFormVisible = true;
  }

  // Annuler l'ajout
  cancelAdd(): void {
    this.isAddFormVisible = false;
    this.newTestAnalyse = {
      id: 0,
      nomTest: '',
      sousEpreuve: '',
      intervalMinDeReference: 0,
      intervalMaxDeReference: 0,
      details: '',
      fkIdAnalyse: 0,
      uniteDeReference: ''
    };
  }

 // Ajouter un test analyse
addTestAnalyse(): void {
  this.testAnalyseService.addTestAnalyse(this.newTestAnalyse).subscribe({
    next: (data: TestAnalyse) => {
      // Ajouter le nouveau test dans la liste principale
      this.testAnalyses.push(data);
      
      // Mettre à jour la liste filtrée seulement si la recherche est active
      if (this.searchQuery) {
        this.filterTests();
      } else {
        // Sinon, laisser filteredTestAnalyses égale à testAnalyses
        this.filteredTestAnalyses = [...this.testAnalyses];
      }

      alert('Test Analyse ajouté avec succès.');
      this.cancelAdd(); // Cacher le formulaire après l'ajout
    },
    error: (err) => {
      this.errorMessage = 'Une erreur est survenue lors de l\'ajout du Test Analyse.';
      console.error(err);
    }
  });
}


  
}
