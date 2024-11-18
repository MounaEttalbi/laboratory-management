import { Routes } from '@angular/router';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';
import { DeleteLaboratoryComponent } from './components/delete-laboratory/delete-laboratory.component';
import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component';
export const routes: Routes = [
    { path: 'list-laboratory', component: ListLaboratoriesComponent }, // Chemin vers ListLaboratory
    { path: 'add-laboratory', component: AddLaboratoryComponent },
    { path: 'edit-laboratory/:id', component: EditLaboratoryComponent },
    { path: 'delete-laboratory/:id', component: DeleteLaboratoryComponent },  // Si vous souhaitez une route directe pour su
    { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées vers HomeComponent
];
