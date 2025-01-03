import { Component, EventEmitter, Output } from '@angular/core';
import { ResultatService } from '../../../services/resultat.service';
import { ExamenService } from '../../../services/examen.service';
import { Examen } from '../../../models/examen';
import { FormGroup, Validators } from '@angular/forms';

export interface Resultat {
  id: number;
  fkIdExamen: number;
  valeursMesurees: string;
  observations: string;
  commentaires: string;
  status: string;
  rapportPDF?: Blob;
}

@Component({
  selector: 'app-resultat-add',
  templateUrl: './resultat-add.component.html',
  styleUrls: ['./resultat-add.component.scss'],
})
export class ResultatAddComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() resultatAdded = new EventEmitter<Resultat>();

  testAnalyses: any[] = []; // Liste des tests d'analyse
    nomTest: string = '';
    selectedExamen: Examen | null = null; // Examen actuellement sélectionné
    contactForm!: FormGroup; // Déclarer le formulaire
    examens: Examen[] = [];



  newResultat: Resultat = {
    id: 0,
    fkIdExamen: 0,
    valeursMesurees: '',
    observations: '',
    commentaires: '',
    status: 'En attente',
  };

  isLoading = false;
  errorMessage = '';
  fb: any;

  constructor(private resultatService: ResultatService,private examenService: ExamenService) {}

  
    ngOnInit(): void {
      this.loadExamens();  // Charger les tests d'analyse dès l'initialisation du composant
      
     
        this.contactForm = this.fb.group({
          fkIdExamen: [null, Validators.required], // Exemple de contrôle
         
          // Ajoutez les autres contrôles ici
        });
      
    }
    loadExamens(): void {
      this.examenService.getAllExamens().subscribe((data) => {
        console.log('Examens:', data);  // Vérifier les données récupérées
        this.examens = data;
      });
    }
    

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';

    // Appeler le service pour ajouter un résultat
    this.resultatService.addResultat(this.newResultat).subscribe({
      next: (result) => {
        this.isLoading = false;

        // Emettre l'événement pour notifier le parent
        this.resultatAdded.emit(result);

        // Réinitialiser le formulaire
        this.resetForm();

        // Fermer la fenêtre modale
        this.closeModal.emit();
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = "Une erreur s'est produite lors de l'ajout du résultat.";
        console.error(error);
      },
    });
  }

  cancel() {
    // Réinitialiser le formulaire et fermer la fenêtre modale
    this.resetForm();
    this.closeModal.emit();
  }

  private resetForm() {
    this.newResultat = {
      id: 0,
      fkIdExamen: 0,
      valeursMesurees: '',
      observations: '',
      commentaires: '',
      status: 'En attente',
    };
  }
}
