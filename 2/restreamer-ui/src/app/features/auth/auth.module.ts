import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
