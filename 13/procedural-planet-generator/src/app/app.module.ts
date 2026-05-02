import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlanetGeneratorComponent } from './components/planet-generator/planet-generator.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';

import { NoiseService } from './services/noise.service';

import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';

import { IconDefinition } from '@ant-design/icons-angular';
import { ReloadOutline, UndoOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ ReloadOutline, UndoOutline ];

@NgModule({
  declarations: [
    AppComponent,
    PlanetGeneratorComponent,
    ControlPanelComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    ReactiveFormsModule,
    CommonModule,
    NzInputNumberModule,
    NzButtonModule,
    NzIconModule.forRoot(icons),
    NzSliderModule
  ],
  providers: [
    NoiseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
