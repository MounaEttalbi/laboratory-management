import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Nécessaire pour le pipe "date"
import { FormsModule } from '@angular/forms';  // Ajoutez cette ligne pour ngModel

// Composants
import { AppComponent } from './app.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';
import { DeleteLaboratoryComponent } from './components/delete-laboratory/delete-laboratory.component';

// Services
import { LaboratoireService } from './services/laboratoire.service';

// Routes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    ListLaboratoriesComponent,
    EditLaboratoryComponent,
    AddLaboratoryComponent,
    DeleteLaboratoryComponent
  ],
  imports: [
    FormsModule, // Pour utiliser ngModel
    BrowserModule,
    ReactiveFormsModule, // Pour les formulaires réactifs
    MatDialogModule,
    RouterModule.forRoot(routes), // Configuration des routes
    CommonModule // Pour utiliser le pipe "date"
  ],
  providers: [LaboratoireService], // Services injectables
  bootstrap: [AppComponent] // Composant principal
})
export class AppModule {}
