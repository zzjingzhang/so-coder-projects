import { Routes } from '@angular/router';
import { RingSizerComponent } from './ring-sizer/ring-sizer.component';

export const routes: Routes = [
  { path: '', component: RingSizerComponent },
  { path: '**', redirectTo: '' }
];
