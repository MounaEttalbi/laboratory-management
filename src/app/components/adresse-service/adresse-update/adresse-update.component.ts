import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdresseService } from '../../../services/adresse.service';

interface Adresse {
  id: number;
  numVoie: string;
  nomVoie: string;
  codePostal: string;
  ville: string;
  commune: string;
}

@Component({
  selector: 'app-adresse-update',
  templateUrl: './adresse-update.component.html',
  styleUrls: ['./adresse-update.component.css']
})
export class AdresseUpdateComponent implements OnInit {
  adresseForm: FormGroup;
  adresse: Adresse = { id: 0, numVoie: '', nomVoie: '', codePostal: '', ville: '', commune: '' };

  constructor(
    private fb: FormBuilder,
    private adresseService: AdresseService,
    private dialogRef: MatDialogRef<AdresseUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { adresseId: number } // Récupère l'ID de l'adresse à mettre à jour
  ) {
    this.adresseForm = this.fb.group({
      numVoie: ['', [Validators.required]],
      nomVoie: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      commune: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadAdresse();
  }

  loadAdresse(): void {
    this.adresseService.getAdresseById(this.data.adresseId).subscribe(
      (adresse) => {
        this.adresseForm.patchValue(adresse); // Remplissez le formulaire avec les données de l'adresse
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'adresse', error);
      }
    );
  }
  onUpdate(): void {
    if (this.adresseForm.valid) {
      this.adresseService.updateAdresse(this.data.adresseId, this.adresseForm.value).subscribe(
        (response) => {
          console.log('Adresse mise à jour avec succès', response);
          this.dialogRef.close(true); // Fermer le dialogue et retourner `true` pour rafraîchir la liste des adresses
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de l\'adresse', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Fermer le dialogue sans enregistrer
  }
}
