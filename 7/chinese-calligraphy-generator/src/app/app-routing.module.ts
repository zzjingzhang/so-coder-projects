import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalligraphyComponent } from './calligraphy/calligraphy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'calligraphy', component: CalligraphyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
