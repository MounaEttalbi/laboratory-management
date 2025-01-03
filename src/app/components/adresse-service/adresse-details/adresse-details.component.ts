import { Component, OnInit, Input,Inject } from '@angular/core';
import { AdresseService } from '../../../services/adresse.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
interface Adresse {
  id: number;
  numVoie: string;
  nomVoie: string;
  codePostal: string;
  ville: string;
  commune: string;
}

@Component({
  selector: 'app-adresse-details',
  templateUrl: './adresse-details.component.html',
  styleUrls: ['./adresse-details.component.css']
})
export class AdresseDetailsComponent implements OnInit {
  adresse?: Adresse;
  errorMessage: string = '';

  constructor(
    public adresseService: AdresseService,
    @Inject(MAT_DIALOG_DATA) public data: { adresseId: number }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.adresseId) {
      this.loadAdresse(this.data.adresseId);
    }
  }

  loadAdresse(id: number): void {
    this.adresseService.getAdresseById(id).subscribe({
      next: (data) => {
        this.adresse = data;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger l\'adresse.';
        console.error(err);
      },
    });
  }
}
