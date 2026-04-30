import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';

export const config: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withFetch()),
  ]
};
