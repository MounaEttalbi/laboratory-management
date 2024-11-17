import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListerUtilisateursComponent } from './components/lister-utilisateurs/lister-utilisateurs.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AjouterUtilisateurComponent } from './components/ajouter-utilisateur/ajouter-utilisateur.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Importez MatSelectModule
import { MatOptionModule } from '@angular/material/core';  
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';
@NgModule({
  declarations: [
    AppComponent,
    ListerUtilisateursComponent,
    SidebarComponent,
    AjouterUtilisateurComponent,
    ListLaboratoriesComponent,
    AddLaboratoryComponent
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,  // Ajout de BrowserAnimationsModule
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule, 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatSidenavModule,  // Importez le module pour le sidenav
    MatListModule,     // Importez le module pour mat-nav-list
    ReactiveFormsModule,
    MatSelectModule, // Ajoutez MatSelectModule ici
    MatOptionModule, // Ajoutez MatOptionModule ici
   
    MatDialogModule,
    MatSnackBarModule, 
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
