import { Routes } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { ExplanationComponent } from './explanation/explanation.component';

export const routes: Routes = [
  { path: '', component: DemoComponent, pathMatch: 'full' },
  { path: 'explanation', component: ExplanationComponent },
  { path: '**', redirectTo: '' }
];
