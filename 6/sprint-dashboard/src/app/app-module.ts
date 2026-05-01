import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutComponent } from './pages/about/about.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { MetricCardsComponent } from './components/metric-cards/metric-cards.component';
import { BurnChartComponent } from './components/burn-chart/burn-chart.component';
import { StoryTableComponent } from './components/story-table/story-table.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';

@NgModule({
  declarations: [
    App,
    DashboardComponent,
    AboutComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    MetricCardsComponent,
    BurnChartComponent,
    StoryTableComponent,
    TeamMembersComponent,
    ProgressCircleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatBadgeModule,
    MatChipsModule,
    FontAwesomeModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
