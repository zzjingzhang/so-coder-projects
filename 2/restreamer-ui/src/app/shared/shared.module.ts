import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CardComponent } from './components/card/card.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DialogComponent,
    LoadingSpinnerComponent,
    ProgressBarComponent,
    CardComponent,
    FormFieldComponent,
    ConfirmDialogComponent,
    EmptyStateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
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
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
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
    ProgressSpinnerModule,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DialogComponent,
    LoadingSpinnerComponent,
    ProgressBarComponent,
    CardComponent,
    FormFieldComponent,
    ConfirmDialogComponent,
    EmptyStateComponent
  ]
})
export class SharedModule { }
