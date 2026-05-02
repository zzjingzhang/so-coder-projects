import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { GraphVisualizationComponent } from './components/graph-visualization/graph-visualization.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { VisualizerComponent } from './components/visualizer/visualizer.component';

@NgModule({
  declarations: [
    App,
    GraphVisualizationComponent,
    ControlPanelComponent,
    VisualizerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    NzButtonModule,
    NzCardModule,
    NzMessageModule,
    NzModalModule,
    NzSelectModule,
    NzSliderModule,
    NzSpaceModule,
    NzStatisticModule,
    NzTypographyModule,
    NzIconModule.forRoot([])
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
