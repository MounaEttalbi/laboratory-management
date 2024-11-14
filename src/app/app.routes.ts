import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'list-laboratory', component: ListLaboratoriesComponent }, // Chemin vers ListLaboratory
    { path: 'add-laboratory', component: AddLaboratoryComponent },
    { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées vers HomeComponent
];
