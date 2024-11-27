import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerUtilisateursComponent } from './components/lister-utilisateurs/lister-utilisateurs.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'login', component: LoginComponent },
  { path: 'utilisateurs', component: ListerUtilisateursComponent },
  { path: 'laboratoires', component: ListLaboratoriesComponent},
  { path: 'adminPannel' , component: SidebarComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
