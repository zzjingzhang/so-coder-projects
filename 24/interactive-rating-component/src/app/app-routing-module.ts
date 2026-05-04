import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RatingComponent } from './rating/rating';
import { ThankYouComponent } from './thank-you/thank-you';

const routes: Routes = [
  { path: '', component: RatingComponent },
  { path: 'thank-you', component: ThankYouComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
