import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentFormData } from './models/tournament.model';
import { TournamentStorageService } from './services/tournament-storage.service';
import { TournamentGeneratorService } from './services/tournament-generator.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Components
import { TournamentFormComponent } from './components/tournament-form/tournament-form.component';
import { BracketDisplayComponent } from './components/bracket-display/bracket-display.component';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    TournamentFormComponent,
    BracketDisplayComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tournament: Tournament | null = null;
  hasSavedTournament = false;
  showForm = true;

  constructor(
    private storageService: TournamentStorageService,
    private generatorService: TournamentGeneratorService
  ) { }

  ngOnInit(): void {
    this.checkSavedTournament();
  }

  checkSavedTournament(): void {
    this.hasSavedTournament = this.storageService.hasSavedTournament();
    if (this.hasSavedTournament) {
      const saved = this.storageService.getTournament();
      if (saved) {
        this.tournament = saved;
        this.showForm = false;
      }
    }
  }

  onFormSubmit(formData: TournamentFormData): void {
    this.tournament = this.generatorService.generateTournament(formData);
    this.storageService.saveTournament(this.tournament);
    this.showForm = false;
    this.hasSavedTournament = true;
  }

  onCreateNew(): void {
    this.tournament = null;
    this.showForm = true;
    this.hasSavedTournament = false;
  }

  onLoadSaved(): void {
    const saved = this.storageService.getTournament();
    if (saved) {
      this.tournament = saved;
      this.showForm = false;
    }
  }

  onClearSaved(): void {
    this.storageService.clearTournament();
    this.tournament = null;
    this.showForm = true;
    this.hasSavedTournament = false;
  }
}
