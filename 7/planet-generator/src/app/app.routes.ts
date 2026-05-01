import { Routes } from '@angular/router';
import { PlanetGeneratorComponent } from './components/planet-generator/planet-generator.component';

export const routes: Routes = [
  {
    path: '',
    component: PlanetGeneratorComponent,
    pathMatch: 'full'
  }
];
