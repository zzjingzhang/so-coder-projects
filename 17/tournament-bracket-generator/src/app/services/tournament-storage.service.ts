import { Injectable } from '@angular/core';
import { Tournament } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentStorageService {
  private readonly STORAGE_KEY = 'tournament_bracket_data';

  constructor() { }

  saveTournament(tournament: Tournament): void {
    tournament.updatedAt = new Date().toISOString();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tournament));
  }

  getTournament(): Tournament | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        return JSON.parse(data) as Tournament;
      } catch (e) {
        console.error('Failed to parse tournament data:', e);
        return null;
      }
    }
    return null;
  }

  clearTournament(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  hasSavedTournament(): boolean {
    return localStorage.getItem(this.STORAGE_KEY) !== null;
  }
}
