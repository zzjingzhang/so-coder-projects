import { Routes } from '@angular/router';
import { SimulatorComponent } from './components/simulator/simulator.component';

export const routes: Routes = [
  { path: '', component: SimulatorComponent },
  { path: '**', redirectTo: '' }
];
