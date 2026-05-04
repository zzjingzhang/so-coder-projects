import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Quiz } from './pages/quiz/quiz';
import { Result } from './pages/result/result';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'quiz', component: Quiz },
  { path: 'result', component: Result },
  { path: '**', redirectTo: '' },
];
