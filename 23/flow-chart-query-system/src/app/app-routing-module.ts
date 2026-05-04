import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlowChartListComponent } from './components/flow-chart-list/flow-chart-list.component';
import { FlowChartDetailComponent } from './components/flow-chart-detail/flow-chart-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: FlowChartListComponent },
  { path: 'detail/:id', component: FlowChartDetailComponent },
  { path: '**', redirectTo: '/list' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
