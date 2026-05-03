import { Routes } from '@angular/router';
import { ElectrolysisDemoComponent } from './electrolysis-demo/electrolysis-demo.component';

export const routes: Routes = [
  { path: '', component: ElectrolysisDemoComponent },
  { path: '**', redirectTo: '' }
];
