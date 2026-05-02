import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Leaderboard } from './components/leaderboard/leaderboard';
import { MatchProgress } from './components/match-progress/match-progress';
import { TeamProfile } from './components/team-profile/team-profile';

@NgModule({
  declarations: [
    App,
    Leaderboard,
    MatchProgress,
    TeamProfile
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatBadgeModule,
    MatChipsModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
