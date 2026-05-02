import { Routes } from '@angular/router';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { HourlyForecastComponent } from './components/hourly-forecast/hourly-forecast.component';

export const routes: Routes = [
  { path: '', redirectTo: '/daily', pathMatch: 'full' },
  { path: 'daily', component: DailyForecastComponent },
  { path: 'hourly', component: HourlyForecastComponent }
];
