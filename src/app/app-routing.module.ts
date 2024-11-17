import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListerUtilisateursComponent } from './components/lister-utilisateurs/lister-utilisateurs.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';

const routes: Routes = [
  { path: 'utilisateurs', component: ListerUtilisateursComponent },
  { path: 'laboratoires', component: ListLaboratoriesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
