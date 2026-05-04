import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./components/auth/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'register', 
    loadComponent: () => import('./components/auth/register.component').then(m => m.RegisterComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  { 
    path: 'survey/create', 
    loadComponent: () => import('./components/survey/survey-edit.component').then(m => m.SurveyEditComponent)
  },
  { 
    path: 'survey/edit/:id', 
    loadComponent: () => import('./components/survey/survey-edit.component').then(m => m.SurveyEditComponent)
  },
  { 
    path: 'survey/manage/:id', 
    loadComponent: () => import('./components/survey/survey-manage.component').then(m => m.SurveyManageComponent)
  },
  { 
    path: 'survey/take/:id', 
    loadComponent: () => import('./components/survey/survey-take.component').then(m => m.SurveyTakeComponent)
  },
  { 
    path: 'survey/results/:id', 
    loadComponent: () => import('./components/results/survey-results.component').then(m => m.SurveyResultsComponent)
  },
  { 
    path: 'surveys/open', 
    loadComponent: () => import('./components/survey/survey-list.component').then(m => m.SurveyListComponent),
    data: { type: 'open' }
  },
  { 
    path: 'surveys/closed', 
    loadComponent: () => import('./components/survey/survey-list.component').then(m => m.SurveyListComponent),
    data: { type: 'closed' }
  },
  { path: '**', redirectTo: '/login' }
];
