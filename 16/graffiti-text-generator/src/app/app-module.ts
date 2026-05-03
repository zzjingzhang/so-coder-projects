import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { GraffitiGenerator } from './graffiti-generator/graffiti-generator';

@NgModule({
  declarations: [App, GraffitiGenerator],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzSliderModule,
    NzSwitchModule,
    NzButtonModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
