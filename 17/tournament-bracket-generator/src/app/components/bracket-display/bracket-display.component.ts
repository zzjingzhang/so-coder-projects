import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Tournament, Match } from '../../models/tournament.model';
import { TournamentStorageService } from '../../services/tournament-storage.service';
import { TournamentGeneratorService } from '../../services/tournament-generator.service';
import { MatchEditDialogComponent } from '../match-edit-dialog/match-edit-dialog.component';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-bracket-display',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './bracket-display.component.html',
  styleUrls: ['./bracket-display.component.css']
})
export class BracketDisplayComponent implements OnInit {
  @Input() tournament!: Tournament;
  
  rounds: Match[][] = [];
  championName: string | null = null;

  constructor(
    private dialog: MatDialog,
    private storageService: TournamentStorageService,
    private generatorService: TournamentGeneratorService
  ) { }

  ngOnInit(): void {
    if (this.tournament) {
      this.organizeRounds();
      this.checkChampion();
    }
  }

  private organizeRounds(): void {
    this.rounds = [];
    for (let round = 1; round <= this.tournament.rounds; round++) {
      const roundMatches = this.tournament.matches.filter(m => m.round === round);
      this.rounds.push(roundMatches);
    }
  }

  private checkChampion(): void {
    if (this.tournament.rounds === 0) {
      this.championName = null;
      return;
    }

    const finalMatch = this.tournament.matches.find(m => m.round === this.tournament.rounds);
    if (finalMatch && finalMatch.winner) {
      const winnerTeam = finalMatch.winner === 'team1' ? finalMatch.team1 : finalMatch.team2;
      this.championName = winnerTeam?.name || null;
    } else {
      this.championName = null;
    }
  }

  getRoundName(round: number): string {
    const totalRounds = this.tournament.rounds;
    const roundFromEnd = totalRounds - round + 1;
    
    switch (roundFromEnd) {
      case 1:
        return '决赛';
      case 2:
        return '半决赛';
      case 3:
        return '四分之一决赛';
      case 4:
        return '八分之一决赛';
      default:
        return `第 ${round} 轮`;
    }
  }

  getMatchSpacing(round: number): number {
    const baseSpacing = 80;
    return baseSpacing * Math.pow(2, round - 1);
  }

  getMatchTeams(match: Match): { name: string; isWinner: boolean; score: number | null }[] {
    const teams: { name: string; isWinner: boolean; score: number | null }[] = [];
    
    if (match.team1) {
      teams.push({
        name: match.team1.name,
        isWinner: match.winner === 'team1',
        score: match.score1
      });
    }
    
    if (match.team2) {
      teams.push({
        name: match.team2.name,
        isWinner: match.winner === 'team2',
        score: match.score2
      });
    }
    
    return teams;
  }

  openMatchEdit(match: Match): void {
    const dialogRef = this.dialog.open(MatchEditDialogComponent, {
      width: '500px',
      data: {
        match: { ...match },
        tournament: this.tournament
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateMatch(result.matchId, result.updates);
      }
    });
  }

  updateMatch(matchId: string, updates: Partial<Match>): void {
    this.tournament = this.generatorService.updateMatchResult(
      this.tournament,
      matchId,
      updates
    );
    this.storageService.saveTournament(this.tournament);
    this.organizeRounds();
    this.checkChampion();
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  }

  isMatchComplete(match: Match): boolean {
    return match.winner !== null;
  }

  canEditMatch(match: Match): boolean {
    if (match.round === 1) return true;
    
    const sourceMatches = this.tournament.matches.filter(m => m.nextMatchId === match.id);
    return sourceMatches.every(m => m.winner !== null);
  }

  getChampionTeam(): { name: string; score: number | null } | null {
    if (!this.championName) return null;
    
    const finalMatch = this.tournament.matches.find(m => m.round === this.tournament.rounds);
    if (!finalMatch || !finalMatch.winner) return null;

    const winnerTeam = finalMatch.winner === 'team1' ? finalMatch.team1 : finalMatch.team2;
    const winnerScore = finalMatch.winner === 'team1' ? finalMatch.score1 : finalMatch.score2;

    return {
      name: winnerTeam?.name || '',
      score: winnerScore
    };
  }

  getRunnerUpTeam(): { name: string; score: number | null } | null {
    if (!this.championName) return null;
    
    const finalMatch = this.tournament.matches.find(m => m.round === this.tournament.rounds);
    if (!finalMatch || !finalMatch.winner) return null;

    const loserTeam = finalMatch.winner === 'team1' ? finalMatch.team2 : finalMatch.team1;
    const loserScore = finalMatch.winner === 'team1' ? finalMatch.score2 : finalMatch.score1;

    if (!loserTeam?.name) return null;

    return {
      name: loserTeam.name,
      score: loserScore
    };
  }
}
