// resultat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ResultatService } from '../../../services/resultat.service';
import { Resultat } from '../../../models/resultat.model';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';

@Component({
  selector: 'app-resultat-list',
  templateUrl: './resultat-list.component.html',
  styleUrls: ['./resultat-list.component.css']
})
export class ResultatListComponent implements OnInit {

  resultats: Resultat[] = [];
  selectedResultat: Resultat | null = null;
  searchTerm: string = '';
  showAddModal: boolean = false;
  currentDateTime : string = '';
  examens: Examen[] = [];

  constructor(private resultatService: ResultatService,private examenService: ExamenService) { }

  ngOnInit(): void {
    this.getResultats();
    this.currentDateTime = this.formatDate(new Date());
    this.loadExamens();
  }
  loadExamens(): void {
    this.examenService.getAllExamens().subscribe({
      next: (data) => {
        this.examens = data; 
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tests d\'analyse :', err);
      }
    });
  }
   // Fonction pour obtenir le nom du test d'analyse basé sur l'ID
   getExamenNomById(examenId: number): string {
    const examen = this.examens.find(t => t.id === examenId);
    return examen ? examen.nom : 'Nom non trouvé';
  }

  // Fonction pour formater la date et l'heure 
  formatDate(date: Date): string {
     const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
      return date.toLocaleDateString('fr-FR', options); 
    }

  // Récupérer tous les résultats
  getResultats(): void {
    this.resultatService.getAllResultats().subscribe((data: Resultat[]) => {
      this.resultats = data;
    }, (error) => {
      console.error('Erreur lors de la récupération des résultats:', error);
    });
  }

  // Fonction pour afficher ou télécharger le PDF
  viewPDF(id: number): void {
    this.resultatService.generateRapportPDF(id).subscribe((pdfBlob: Blob) => {
      const fileURL = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = fileURL;
      link.download = `rapport_resultat_${id}.pdf`;
      link.click();
    }, (error: any) => {
      console.error('Erreur lors de la génération du PDF:', error);
    });
  }

  // Filtrer les résultats en fonction du terme de recherche
  filterResultats(): Resultat[] {
    return this.resultats.filter(resultat =>
      resultat.valeursMesurees.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Ouvrir la modale de mise à jour
  openUpdateModal(resultat: Resultat): void {
    this.selectedResultat = { ...resultat }; // Clone l'examen sélectionné
  }

  // Fermer la modale de mise à jour
  closeUpdateModal(): void {
    this.selectedResultat = null;
  }

  // Ouvrir la modale d'ajout
  openAddResultatModal(): void {
    this.showAddModal = true;
  }

  // Fermer la modale d'ajout
  closeAddResultatModal(): void {
    this.showAddModal = false;
  }

  // Supprimer un résultat
  deleteResultat(id: number): void {
    this.resultatService.deleteResultat(id).subscribe(() => {
      this.getResultats();
    }, (error) => {
      console.error('Erreur lors de la suppression du résultat:', error);
    });
  }
}
