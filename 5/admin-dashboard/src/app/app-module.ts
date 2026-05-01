import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgZorroModule } from './shared/ng-zorro.module';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LogoComponent } from './components/logo/logo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    LayoutComponent,
    HomeComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgZorroModule,
    FormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App],
})
export class AppModule {}
