import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'incense-archive',
    loadComponent: () => import('./pages/incense-archive/incense-archive.component').then(m => m.IncenseArchiveComponent),
  },
  {
    path: 'incense-record',
    loadComponent: () => import('./pages/incense-record/incense-record.component').then(m => m.IncenseRecordComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
