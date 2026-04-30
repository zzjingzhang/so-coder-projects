import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PlayerComponent } from './player.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PlayerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':channelId',
    component: PlayerComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    PlayerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PlayerModule { }
