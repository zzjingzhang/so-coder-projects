import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizerComponent } from './components/visualizer/visualizer.component';

const routes: Routes = [
  { path: '', component: VisualizerComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
