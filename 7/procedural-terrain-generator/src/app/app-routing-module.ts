import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerrainGeneratorComponent } from './components/terrain-generator/terrain-generator.component';

const routes: Routes = [
  { path: '', redirectTo: '/terrain', pathMatch: 'full' },
  { path: 'terrain', component: TerrainGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
