import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { KnowledgeComponent } from './components/knowledge/knowledge.component';
import { TraitUploadComponent } from './components/trait-upload/trait-upload.component';
import { HybridSimulationComponent } from './components/hybrid-simulation/hybrid-simulation.component';
import { ResultsDisplayComponent } from './components/results-display/results-display.component';

@NgModule({
  declarations: [
    App,
    KnowledgeComponent,
    TraitUploadComponent,
    HybridSimulationComponent,
    ResultsDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}
