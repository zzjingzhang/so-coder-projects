import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'player', 
    pathMatch: 'full' 
  },
  { 
    path: 'player', 
    loadComponent: () => import('./features/music-player/music-player.component').then(m => m.MusicPlayerComponent) 
  },
];
