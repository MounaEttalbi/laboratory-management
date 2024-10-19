import { Component ,OnInit} from '@angular/core';
import { LaboratoireService } from '../services/laboratoire.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.scss'
})
export class HomeComponent implements OnInit {

  laboratoires: any[] = [];  // Tableau pour stocker les laboratoires

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
