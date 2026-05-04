import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Components
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { AnnouncementFormComponent } from './components/announcement-form/announcement-form.component';
import { AnnouncementPopupComponent } from './components/announcement-popup/announcement-popup.component';
import { AnnouncementCarouselComponent } from './components/announcement-carousel/announcement-carousel.component';
import { DemoPageComponent } from './components/layout/demo-page.component';

// Services
import { AnnouncementService } from './services/announcement.service';
import { MockDataService } from './services/mock-data.service';

// PrimeNG Configuration
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

// PrimeNG Components
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@NgModule({
  declarations: [
    App,
    AnnouncementListComponent,
    AnnouncementFormComponent,
    AnnouncementPopupComponent,
    AnnouncementCarouselComponent,
    DemoPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // PrimeNG Modules
    TableModule,
    ButtonModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    CalendarModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    PaginatorModule,
    TagModule,
    TooltipModule,
    CardModule,
    DividerModule,
    PanelModule,
    FieldsetModule,
    InputSwitchModule,
    MultiSelectModule,
    ChipsModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    providePrimeNG({ theme: { preset: Lara } }),
    MessageService,
    ConfirmationService,
    AnnouncementService,
    MockDataService
  ],
  bootstrap: [App]
})
export class AppModule { }
