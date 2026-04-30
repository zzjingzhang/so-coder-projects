import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';

import { CollapsibleHeaderComponent } from './collapsible-header.component';
import { ScrollListComponent } from './scroll-list.component';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    AppComponent,
    CollapsibleHeaderComponent,
    ScrollListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
