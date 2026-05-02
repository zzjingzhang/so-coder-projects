import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { MemberListComponent } from './pages/member-list/member-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: '仪表盘' }
  },
  {
    path: 'projects',
    component: ProjectListComponent,
    data: { title: '项目管理' }
  },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    data: { title: '项目详情' }
  },
  {
    path: 'members',
    component: MemberListComponent,
    data: { title: '成员管理' }
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
