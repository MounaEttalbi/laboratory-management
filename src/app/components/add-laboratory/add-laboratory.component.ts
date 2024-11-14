import { Component , OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LaboratoireService } from '../../services/laboratoire.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-laboratory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-laboratory.component.html',
  styleUrls: ['./add-laboratory.component.css']
})
export class AddLaboratoryComponent implements OnInit {
  laboratoire = {
    id: null,
    nom: '',
    nrc: '',
    statut: 1,
    logo: null,  // Assurez-vous que logo peut être null
    date_activation: ''
  };

  constructor(private laboratoireService: LaboratoireService, private router: Router) { }

  ngOnInit(): void {
    console.log("AddLaboratoryComponent initialisé");
  }

  // Gestion du changement de fichier
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.laboratoire.logo = file;
    }
  }

  addLaboratoire() {
    const formData = new FormData();
    formData.append('laboratoire', new Blob([JSON.stringify(this.laboratoire)], { type: 'application/json' }));
    if (this.laboratoire.logo) {
      formData.append('logo', this.laboratoire.logo);
    }

    this.laboratoireService.addLaboratoire(formData).subscribe({
      next: (response) => {
        console.log('Laboratoire ajouté avec succès: ', response);
        this.router.navigate(['/laboratoires']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout du laboratoire: ', error);
        alert('Erreur lors de l\'ajout du laboratoire');
      }
    });
  }
}