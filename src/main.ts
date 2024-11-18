import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    // Ajoutez les fournisseurs nécessaires ici
    importProvidersFrom(RouterModule.forRoot(routes))
  ],
}).catch(err => console.error(err));
