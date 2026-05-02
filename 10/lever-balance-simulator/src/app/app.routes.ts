import { Routes } from '@angular/router';
import { LeverSimulatorComponent } from './components/lever-simulator/lever-simulator.component';

export const routes: Routes = [
  { path: '', component: LeverSimulatorComponent },
  { path: '**', redirectTo: '' }
];
