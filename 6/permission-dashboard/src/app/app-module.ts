import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PermissionTreeComponent } from './components/permission-tree/permission-tree.component';
import { PermissionManagementComponent } from './pages/permission-management/permission-management.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    App,
    SidebarComponent,
    PermissionTreeComponent,
    PermissionManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatTreeModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDividerModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
  ],
  bootstrap: [App]
})
export class AppModule { }
