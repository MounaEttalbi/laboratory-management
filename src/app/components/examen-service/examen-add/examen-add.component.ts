import { Component, EventEmitter, Output } from '@angular/core';
import { ExamenService } from '../../../services/examen.service';
import { TestAnalyseService } from '../../../services/test-analyse.service';
import { Examen } from '../../../models/examen';
import Swal from 'sweetalert2'; // Assurez-vous d'installer SweetAlert2 si vous l'utilisez
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DossierService } from '../../../services/dossier.service';
import { Dossier } from '../../../models/dossier.model';

interface TestAnalyse {
  id: number;
  nomTest: string ;
}

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css']
})
export class ExamenAddComponent {

  testAnalyses: any[] = []; // Liste des tests d'analyse
  nomTest: string = '';
  selectedTestAnalyseId: number | null = null;
  contactForm!: FormGroup; // Déclarer le formulaire
  dossiers: Dossier[] = []; // Liste des dossiers

  examen: Examen = {
    id: 0,
    nom: '',
    date: '',
    status: 'en cours',
    commentaires: '',
    fkNumDossier: 0,
    fkIdEpreuve: 0,
    fkIdTestAnalyse: 0
  };

  @Output() closeModalEvent = new EventEmitter<void>(); // Événement pour fermer la modale
  

  constructor(private examenService: ExamenService, private testAnalyseService: TestAnalyseService,private fb: FormBuilder,private dossierService: DossierService) {}

  ngOnInit(): void {
    this.loadTestAnalyses();  // Charger les tests d'analyse dès l'initialisation du composant
    this.loadDossiers(); // Charger les dossiers dès le démarrage
   
      this.contactForm = this.fb.group({
        fkIdTestAnalyse: [null, Validators.required], // Exemple de contrôle
        fkNumDossier: [null, Validators.required],
        // Ajoutez les autres contrôles ici
      });
    
  }
  loadDossiers(): void {
    this.dossierService.getAllDossiers().subscribe({
      next: (data) => {
        this.dossiers = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des dossiers :', err);
      }
    });
  }
 

  // Charger les tests d'analyse depuis le service
  loadTestAnalyses(): void {
    this.testAnalyseService.getAllTestAnalyses().subscribe({
      next: (data) => {
        console.log('Tests d\'analyse chargés :', data);  // Vérifiez la structure des données
        this.testAnalyses = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des tests d\'analyse :', err);
      }
    });
  }
  
  

  addExamen(): void {
    this.examenService.createExamen(this.examen).subscribe({
      next: (data) => {
        console.log('Examen ajouté avec succès:', data);
        Swal.fire({
          icon: 'success',
          title: 'Examen ajouté avec succès',
          text: 'L\'examen a été ajouté avec succès.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.closeModal();
        });
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout de l\'examen:', err);
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Une erreur s\'est produite lors de l\'ajout de l\'examen.',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  closeModal(): void {
    this.closeModalEvent.emit(); // Émettre l'événement pour fermer la modale
  }

  onCancel(): void {
    this.closeModalEvent.emit(); // Notifie le parent de fermer la modale
  }

  getErrorMessage(controlName: string): string {
    const control = this.contactForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} est requis.`;
    }
    return '';
  }
}
