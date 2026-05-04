import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RatingComponent } from './rating/rating';
import { ThankYouComponent } from './thank-you/thank-you';

import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    App,
    RatingComponent,
    ThankYouComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    RatingModule,
    CardModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
