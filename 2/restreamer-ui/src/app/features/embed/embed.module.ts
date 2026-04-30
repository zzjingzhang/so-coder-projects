import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { EmbedComponent } from './embed.component';

const routes: Routes = [
  {
    path: '',
    component: EmbedComponent
  },
  {
    path: ':channelId',
    component: EmbedComponent
  }
];

@NgModule({
  declarations: [
    EmbedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EmbedModule { }
