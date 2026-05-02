import { Routes } from '@angular/router';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';

export const routes: Routes = [
  { path: '', component: GameOfLifeComponent },
  { path: 'game', component: GameOfLifeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
