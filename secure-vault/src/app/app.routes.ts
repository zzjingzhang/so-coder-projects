import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddPasswordComponent } from './pages/add-password/add-password.component';
import { EditPasswordComponent } from './pages/edit-password/edit-password.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full'
  },
  {
    path: 'add',
    component: AddPasswordComponent
  },
  {
    path: 'edit/:id',
    component: EditPasswordComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
