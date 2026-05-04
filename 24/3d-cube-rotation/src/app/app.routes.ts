import { Routes } from '@angular/router';
import { CubeRotationComponent } from './cube-rotation/cube-rotation';

export const routes: Routes = [
  { path: '', component: CubeRotationComponent },
  { path: '**', redirectTo: '' }
];
