import { APP_INITIALIZER,  NgModule } from '@angular/core';
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

import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import {ContactListComponent} from './components/contact-service/contact-list/contact-list.component';
import {ContactAddComponent} from './components/contact-service/contact-add/contact-add.component';
import {ContactUpdateComponent} from './components/contact-service/contact-update/contact-update.component';
import {ContactDeleteComponent} from './components/contact-service/contact-delete/contact-delete.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ContactUpdate2Component } from './components/contact-service/contact-update2/contact-update2.component';
import { AdresseDetailsComponent } from './components/adresse-service/adresse-details/adresse-details.component';
import {DeleteLaboratoryComponent} from './components/delete-laboratory/delete-laboratory.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak
      .init({
        config: {
          url: 'http://localhost:8080',
          realm: 'ProjetLibre-realm',
          clientId: 'Projet-client',
        },
        initOptions: {
          onLoad: 'login-required',  // Vérifier si l'utilisateur est déjà authentifié
          silentCheckSsoRedirectUri: 
            typeof window !== 'undefined' && window.location
              ? window.location.origin + '/assets/silent-check-sso.html'
              : '',  // Assurez-vous que l'URL de redirection existe
        },
      })
      .then(() => console.log('Keycloak initialized'))
      .catch((err) => console.error('Keycloak initialization failed', err));
}

import { PatientComponent } from './components/patient/patient.component';
import { PatientAddComponent } from './components/patient/patient-add/patient-add.component';
import { PatientDeleteComponent } from './components/patient/patient-delete/patient-delete.component';
import { PatientEditComponent } from './components/patient/patient-edit/patient-edit.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { DossierAddComponent } from './components/dossier/dossier-add/dossier-add.component';
import { DossierListComponent } from './components/dossier/dossier-list/dossier-list.component';

import { MatNativeDateModule } from '@angular/material/core';
import { DossierDeleteComponent } from './components/dossier/dossier-delete/dossier-delete.component';
import { DossierEditComponent } from './components/dossier/dossier-edit/dossier-edit.component';

import { NgChartsModule } from 'ng2-charts'; // Importation correcte
import { bootstrapApplication } from '@angular/platform-browser';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { BaseChartDirective } from 'ng2-charts'; // Import du module NgCharts
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AnalyseFormComponent } from './components/analyse-form/analyse-form.component';

import { AddAnalyseComponent } from './components/add-analyse/add-analyse.component';
import { ListAnalyseComponent } from './components/list-analyse/list-analyse.component';
import { EditAnalyseComponent } from './components/edit-analyse/edit-analyse.component';
import { AddEpreuveComponent } from './components/add-epreuve/add-epreuve.component';
import { AnalysisDetailsComponent } from './components/analysis-details/analysis-details.component';

import { TechnicianPageComponent } from './components/technician-page/technician-page.component';
import { ChercheurPageComponent } from './components/chercheur-page/chercheur-page.component';
import { ExamenListComponent } from './components/examen-service/examen-list/examen-list.component';
import { ExamenAddComponent } from './components/examen-service/examen-add/examen-add.component';
import { ExamenUpdateComponent } from './components/examen-service/examen-update/examen-update.component';
import { ExamenDeleteComponent } from './components/examen-service/examen-delete/examen-delete.component';
import { TestAnalyseComponent } from './components/test-analyse-service/test-analyse/test-analyse.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ResultatListComponent } from './components/resultat-service/resultat-list/resultat-list.component';
import { ResultatAddComponent } from './components/resultat-service/resultat-add/resultat-add.component';
import { ResultatUpdateComponent } from './components/resultat-service/resultat-update/resultat-update.component';
import { DashboardTechnicienComponent } from './components/dashboard-technicien/dashboard-technicien.component';
import { DashboardChercheurComponent } from './components/dashboard-chercheur/dashboard-chercheur.component';



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

    AnalyseFormComponent,
    UserProfileComponent,


    PatientComponent,
    PatientAddComponent,
    PatientDeleteComponent,
    PatientEditComponent,
    DossierAddComponent,
    DossierListComponent,
    DossierDeleteComponent,
    DossierEditComponent,
    DashboardAdminComponent,

    AddAnalyseComponent,
    ListAnalyseComponent,
    EditAnalyseComponent,
    AddEpreuveComponent,
    AnalysisDetailsComponent,
    TechnicianPageComponent,
    ChercheurPageComponent,
    ExamenListComponent,
    ExamenAddComponent,
    ExamenUpdateComponent,
    ExamenDeleteComponent,
    TestAnalyseComponent,
    LogoutComponent,
    ResultatListComponent,
    ResultatAddComponent,
    ResultatUpdateComponent,
    DashboardTechnicienComponent,
    DashboardChercheurComponent
  ],
  imports: [
    KeycloakAngularModule,    KeycloakAngularModule,
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
    MatNativeDateModule,
    NgChartsModule,


    MatAutocompleteModule,
    MatInputModule,

    ReactiveFormsModule, 
    BrowserAnimationsModule,

  ],
  providers: [ {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  },

    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}