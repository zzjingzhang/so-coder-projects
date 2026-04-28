import { Routes } from '@angular/router';
import { AlertsComponent } from './alerts/alerts.component';

export const routes: Routes = [
  { path: '', component: AlertsComponent },
  { path: 'alerts', component: AlertsComponent },
  { path: '**', redirectTo: '' }
];
