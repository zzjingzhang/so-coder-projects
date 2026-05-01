import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideNzI18n, zh_CN } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    App,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzTypographyModule,
    NzDividerModule,
    NzTagModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNzI18n(zh_CN)
  ],
  bootstrap: [App]
})
export class AppModule { }
