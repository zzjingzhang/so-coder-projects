import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'introduction', 
    pathMatch: 'full' 
  },
  { 
    path: 'introduction', 
    loadComponent: () => import('./introduction/introduction.component').then(m => m.IntroductionComponent) 
  },
  { 
    path: 'animation', 
    loadComponent: () => import('./animation/animation.component').then(m => m.AnimationComponent) 
  },
  { 
    path: 'formula', 
    loadComponent: () => import('./formula/formula.component').then(m => m.FormulaComponent) 
  },
  { 
    path: 'application', 
    loadComponent: () => import('./application/application.component').then(m => m.ApplicationComponent) 
  },
  { 
    path: 'quiz', 
    loadComponent: () => import('./quiz/quiz.component').then(m => m.QuizComponent) 
  }
];
