import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionManagementComponent } from './pages/permission-management/permission-management.component';

const routes: Routes = [
  { path: '', redirectTo: '/permission-management', pathMatch: 'full' },
  { path: 'permission-management', component: PermissionManagementComponent },
  { path: '**', redirectTo: '/permission-management' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
