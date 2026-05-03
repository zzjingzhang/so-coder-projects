import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';
import { BracketDisplayComponent } from './components/bracket-display/bracket-display.component';
import { MatchEditDialogComponent } from './components/match-edit-dialog/match-edit-dialog.component';

// Services
import { TournamentStorageService } from './services/tournament-storage.service';
import { TournamentGeneratorService } from './services/tournament-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    TournamentFormComponent,
    BracketDisplayComponent,
    MatchEditDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    // Material Modules
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [
    TournamentStorageService,
    TournamentGeneratorService,
    { provide: MAT_DATE_LOCALE, useValue: 'zh-CN' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
