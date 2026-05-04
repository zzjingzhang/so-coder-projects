import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { FlowChartListComponent } from './components/flow-chart-list/flow-chart-list.component';
import { FlowChartDetailComponent } from './components/flow-chart-detail/flow-chart-detail.component';
import { NodeDetailDialogComponent } from './components/node-detail-dialog/node-detail-dialog.component';
import { FlowChartDataService } from './services/flow-chart-data.service';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlowChartListComponent,
    FlowChartDetailComponent,
    NodeDetailDialogComponent
  ],
  providers: [
    FlowChartDataService,
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
