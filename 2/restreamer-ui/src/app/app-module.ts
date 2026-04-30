import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/');
}

@NgModule({
  declarations: [
    App,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      fallbackLang: 'en'
    }),
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    CheckboxModule,
    RadioButtonModule,
    ProgressBarModule,
    ToastModule,
    MenuModule,
    PanelModule,
    DividerModule,
    BadgeModule,
    AvatarModule,
    TooltipModule,
    ConfirmDialogModule,
    SliderModule,
    SelectButtonModule,
    MultiSelectModule,
    ChipModule,
    FileUploadModule,
    ImageModule,
    TagModule,
    ProgressSpinnerModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    MessageService,
    ConfirmationService
  ],
  bootstrap: [App]
})
export class AppModule { }
