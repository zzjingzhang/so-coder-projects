import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRowModule, NzColModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { MemberListComponent } from './pages/member-list/member-list.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectListComponent,
    ProjectDetailComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzCardModule,
    NzStatisticModule,
    NzProgressModule,
    NzListModule,
    NzTagModule,
    NzBadgeModule,
    NzAvatarModule,
    NzModalModule,
    NzMessageModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzDropDownModule,
    NzSpinModule,
    NzEmptyModule,
    NzToolTipModule,
    NzRowModule,
    NzColModule,
    NzIconModule.forRoot([])
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    { provide: NZ_I18N, useValue: zh_CN }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
