import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';

import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component';
import { DashboardComponent } from './dashboard/dashboard.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'list-laboratory', component: ListLaboratoriesComponent }, // Chemin vers ListLaboratory
    { path: 'add-laboratory', component: AddLaboratoryComponent },
    { path: 'edit-laboratory/:id', component: EditLaboratoryComponent },

    { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées vers HomeComponent
];
