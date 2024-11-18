import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Indique que ce composant est autonome
  imports: [RouterModule], // Importez les modules nécessaires ici
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-de-laboratoire';
}
