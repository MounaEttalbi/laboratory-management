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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Importez MatSelectModule
import { MatOptionModule } from '@angular/material/core';  
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BackgroundComponent } from './components/background/background.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component';
import {AjouterUtilisateurComponent} from './components/ajouter-utilisateur/ajouter-utilisateur.component';
import {SidebarComponent} from './components/sidebar/sidebar.component'
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ListerUtilisateursComponent,
    ListLaboratoriesComponent,
    AddLaboratoryComponent,
    AboutUsComponent,
    BackgroundComponent,
    ContactComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    EditLaboratoryComponent,
    AjouterUtilisateurComponent,
    
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
    AppRoutingModule,
    MatDialogModule,
    MatSnackBarModule, 
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}