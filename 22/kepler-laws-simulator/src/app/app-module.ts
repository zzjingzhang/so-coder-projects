import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideAnimations } from '@angular/platform-browser/animations';

import { OrbitVisualizationComponent } from './components/orbit-visualization/orbit-visualization.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { SimulatorComponent } from './pages/simulator/simulator.component';

@NgModule({
  declarations: [
    App,
    OrbitVisualizationComponent,
    ControlPanelComponent,
    DataDisplayComponent,
    SimulatorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzCardModule,
    NzButtonModule,
    NzRadioModule,
    NzSliderModule,
    NzIconModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [App]
})
export class AppModule { }
