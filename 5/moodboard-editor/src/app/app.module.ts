import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

import { AppComponent } from './app.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: AppComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzTabsModule,
    NzUploadModule,
    NzSelectModule,
    NzInputModule,
    NzMessageModule,
    NzToolTipModule,
    NzDropDownModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
