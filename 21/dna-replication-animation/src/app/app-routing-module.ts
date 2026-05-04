import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DnaReplicationAnimationComponent } from './dna-replication-animation/dna-replication-animation';

const routes: Routes = [
  { path: '', redirectTo: 'dna-replication', pathMatch: 'full' },
  { path: 'dna-replication', component: DnaReplicationAnimationComponent },
  { path: '**', redirectTo: 'dna-replication' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
