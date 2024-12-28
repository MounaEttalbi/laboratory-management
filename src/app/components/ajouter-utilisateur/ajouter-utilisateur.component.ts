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
        username: [this.utilisateurData.username, Validators.required],
        firstName: [this.utilisateurData.firstName, Validators.required],
        lastName: [this.utilisateurData.lastName, [Validators.required]],
        email: [this.utilisateurData.email, [Validators.required, Validators.email]],
        role: [],
        
      });
    } else {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],  // Nouveau champ CIN
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
  
      role: ['', Validators.required]
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
    if(this.isEditMode){
      this.utilisateurService.updateUtilisateur(this.formGroup.value.username,this.formGroup.value).subscribe(() => {
        console.log('Conducteur modif avec succès');
       // this.router.navigate(['/confirmationCond'], { state: {conducteur: conducteur } });
        
      console.log("user",);
      this.snackBar.open('Utilisateur modif avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
      }, (error: any) => {
        console.error('Erreur lors de modif du conducteur');
        console.error(error);
      });
    }
    if( this.isEditMode){
      console.log("daz modif",this.utilisateurData)
    }
    else if (this.formGroup.valid) {
      const utilisateur: InscriptionUtilisateur = {
        ...this.formGroup.value,
      };
      utilisateur.password = this.generateRandomString(10);
      console.log('Cvoirr',utilisateur);
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
