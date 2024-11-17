import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InscriptionUtilisateur, Role } from '../../models/Utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent {
  formGroup: FormGroup;
  roles = Object.values(Role); // Valeurs d'exemple de l'énumération
  isEditMode: boolean = false; 
  constructor(
    private utilisateurService:UtilisateurService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AjouterUtilisateurComponent>,
    @Inject(MAT_DIALOG_DATA) public utilisateurData: InscriptionUtilisateur
  ) {
    if (this.utilisateurData ) {
      this.isEditMode = true;  // Si un utilisateur existe, on est en mode édition
      this.formGroup = this.fb.group({
        cin: [this.utilisateurData.cin, Validators.required],
        nomComplet: [this.utilisateurData.nomComplet, Validators.required],
        email: [this.utilisateurData.email, [Validators.required, Validators.email]],
        numTel: [this.utilisateurData.numTel, [Validators.required, Validators.pattern('^\\+?\\d{1,3}?[- ]?\\(?\\d{1,3}\\)?[- ]?\\d{1,4}[- ]?\\d{1,4}[- ]?\\d{1,9}$')]],
        role: [this.utilisateurData.role, Validators.required],
        signature: [this.utilisateurData.signature || '']
      });
    } else {
    this.formGroup = this.fb.group({
      cin: ['', Validators.required],  // Nouveau champ CIN
      nomComplet: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', [Validators.required, Validators.pattern('^\\+?\\d{1,3}?[- ]?\\(?\\d{1,3}\\)?[- ]?\\d{1,4}[- ]?\\d{1,4}[- ]?\\d{1,9}$')]],
      role: ['', Validators.required],
      signature: []
    });
  }}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.formGroup.patchValue({ signature: file });
    }
  }

  generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@+-';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  onSave(): void {
    if( this.isEditMode){
      console.log("daz modif",this.utilisateurData)
    }
    else if (this.formGroup.valid) {
      const utilisateur: InscriptionUtilisateur = {
        ...this.formGroup.value,
      };
      utilisateur.mdp = this.generateRandomString(10);
      this.utilisateurService.ajouterUtilisateur(utilisateur).subscribe(() => {
        console.log('Conducteur ajouté avec succès',utilisateur);
       // this.router.navigate(['/confirmationCond'], { state: {conducteur: conducteur } });
        
      console.log("user", utilisateur);
      this.snackBar.open('Utilisateur ajouté avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      }, (error: any) => {
        console.error('Erreur lors de l\'ajout du conducteur',utilisateur);
        console.error(error);
      });


    } else {
      this.snackBar.open('Veuillez remplir correctement le formulaire.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar'],
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
