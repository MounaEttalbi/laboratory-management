import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importer le module des formulaires réactifs
import { AppComponent } from './app.component'; // Composant principal (par défaut dans un projet Angular)
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component'; // Exemple de composant
import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component'; // Exemple de composant
import { LaboratoireService } from './services/laboratoire.service'; // Service pour gérer les laboratoires
import { MatDialogModule } from '@angular/material/dialog'; // Pour les boîtes de dialogue Angular Material
import { routes } from './app.routes'; // Importer les routes définies
import { RouterModule } from '@angular/router'; // Importer le module de routage

@NgModule({
  declarations: [
    AppComponent, // Déclarez le composant principal ici
    ListLaboratoriesComponent, // Déclarez tous vos autres composants ici
    EditLaboratoryComponent // Exemple de composant à déclarer
  ],
  imports: [
    BrowserModule, // Importer le module de base pour une application Angular
    ReactiveFormsModule, // Ajoutez le module des formulaires réactifs ici
    MatDialogModule,// Ajoutez les modules nécessaires d'Angular Material
    RouterModule.forRoot(routes) // Configurez les routes dans le module
  ],
  providers: [LaboratoireService], // Déclarez vos services ici
  bootstrap: [AppComponent] // Déclare le composant principal de l'application
})
export class AppModule { }
