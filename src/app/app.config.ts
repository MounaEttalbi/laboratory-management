import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Importez withFetch

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch()), // Activez l'utilisation de fetch
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
