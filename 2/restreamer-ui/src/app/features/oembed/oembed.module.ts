import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { OEmbedComponent } from './oembed.component';

const routes: Routes = [
  {
    path: '',
    component: OEmbedComponent
  }
];

@NgModule({
  declarations: [
    OEmbedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class OEmbedModule { }
