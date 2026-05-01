import { Routes } from '@angular/router';
import { ForestComponent } from './pages/forest/forest.component';

export const routes: Routes = [
  {
    path: '',
    component: ForestComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
