import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';  // Importer RouterOutlet
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ListLaboratoriesComponent } from './components/list-laboratories/list-laboratories.component';  // Importer ListLaboratoriesComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, ListLaboratoriesComponent], // Ajouter ListLaboratoriesComponent aux imports si nécessaire
  template: `
    <router-outlet></router-outlet> <!-- RouterOutlet affiche les composants en fonction de la route -->
  `,
  styles: []
})
export class AppComponent {
  title = 'frontend-projet-libre';
}
