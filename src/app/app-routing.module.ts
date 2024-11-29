import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerUtilisateursComponent } from './components/lister-utilisateurs/lister-utilisateurs.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { AddLaboratoryComponent } from './components/add-laboratory/add-laboratory.component';
import { DeleteLaboratoryComponent } from './components/delete-laboratory/delete-laboratory.component';
import { EditLaboratoryComponent } from './components/edit-laboratory/edit-laboratory.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'utilisateurs', component: ListerUtilisateursComponent },
  { path: 'adminPannel' , component: SidebarComponent},
  { path: 'list-laboratory', component: ListLaboratoriesComponent },
  { path: 'edit-laboratory/:id', component: EditLaboratoryComponent },
  { path: 'add-laboratory', component: AddLaboratoryComponent },
  { path: 'delete-laboratory/:id', component: DeleteLaboratoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
