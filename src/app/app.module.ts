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
import {SidebarComponent} from './components/sidebar/sidebar.component';
import { AdresseListComponent } from './components/adresse-service/adresse-list/adresse-list.component';
import { AdresseAddComponent } from './components/adresse-service/adresse-add/adresse-add.component';
import { AdresseUpdateComponent } from './components/adresse-service/adresse-update/adresse-update.component';
import { AdresseDeleteComponent } from './components/adresse-service/adresse-delete/adresse-delete.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

import {ContactListComponent} from './components/contact-service/contact-list/contact-list.component';
import {ContactAddComponent} from './components/contact-service/contact-add/contact-add.component';
import {ContactUpdateComponent} from './components/contact-service/contact-update/contact-update.component';
import {ContactDeleteComponent} from './components/contact-service/contact-delete/contact-delete.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactUpdate2Component } from './components/contact-service/contact-update2/contact-update2.component';
import { AdresseDetailsComponent } from './components/adresse-service/adresse-details/adresse-details.component';
import {DeleteLaboratoryComponent} from './components/delete-laboratory/delete-laboratory.component';
import { PatientComponent } from './components/patient/patient.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { PatientDeleteComponent } from './components/patient/patient-delete/patient-delete.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
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
    AdresseListComponent,
    AdresseAddComponent,
    AdresseUpdateComponent,
    AdresseDeleteComponent,
    ContactListComponent,
    ContactAddComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
    ContactDetailsComponent,
    ContactUpdate2Component,
    AdresseDetailsComponent,
    DeleteLaboratoryComponent,
    PatientComponent,
    PatientAddComponent,
    PatientDeleteComponent,
    PatientEditComponent,
    
  ],
  imports: [

    HttpClientModule,
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
    MatDatepickerModule,
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}