import { Injectable } from '@angular/core';
import { Tournament, Match, TournamentFormData } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentGeneratorService {

  constructor() { }

  generateTournament(formData: TournamentFormData): Tournament {
    const rounds = this.calculateRounds(formData.teamCount);
    const matches = this.generateMatches(formData.teamCount, rounds);

    const tournament: Tournament = {
      name: formData.name,
      startDate: formData.startDate,
      endDate: formData.endDate,
      teamCount: formData.teamCount,
      rounds: rounds,
      matches: matches,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return tournament;
  }

  private calculateRounds(teamCount: number): number {
    return Math.ceil(Math.log2(teamCount));
  }

  private generateMatches(teamCount: number, rounds: number): Match[] {
    const matches: Match[] = [];
    const firstRoundMatches = Math.pow(2, rounds - 1);
    const byes = firstRoundMatches * 2 - teamCount;

    let matchId = 0;

    for (let round = 1; round <= rounds; round++) {
      const matchesInRound = Math.pow(2, rounds - round);

      for (let position = 0; position < matchesInRound; position++) {
        const match: Match = {
          id: `match-${matchId++}`,
          round: round,
          position: position,
          team1: null,
          team2: null,
          score1: null,
          score2: null,
          matchDate: null,
          winner: null,
          nextMatchId: null
        };

        matches.push(match);
      }
    }

    this.setNextMatchIds(matches, rounds);
    this.setByes(matches, byes, firstRoundMatches);

    return matches;
  }

  private setNextMatchIds(matches: Match[], rounds: number): void {
    for (let round = 1; round < rounds; round++) {
      const matchesInCurrentRound = matches.filter(m => m.round === round);
      const matchesInNextRound = matches.filter(m => m.round === round + 1);

      for (let i = 0; i < matchesInCurrentRound.length; i += 2) {
        const nextMatchIndex = Math.floor(i / 2);
        if (nextMatchIndex < matchesInNextRound.length) {
          matchesInCurrentRound[i].nextMatchId = matchesInNextRound[nextMatchIndex].id;
          if (i + 1 < matchesInCurrentRound.length) {
            matchesInCurrentRound[i + 1].nextMatchId = matchesInNextRound[nextMatchIndex].id;
          }
        }
      }
    }
  }

  private setByes(matches: Match[], byes: number, firstRoundMatches: number): void {
    const firstRoundMatchesList = matches.filter(m => m.round === 1);
    
    for (let i = 0; i < byes; i++) {
      const matchIndex = i % 2 === 0 ? i : firstRoundMatchesList.length - i;
      if (matchIndex >= 0 && matchIndex < firstRoundMatchesList.length) {
        const match = firstRoundMatchesList[matchIndex];
        if (match.team1 === null) {
          match.team1 = { name: '轮空 (Bye)' };
          match.winner = 'team1';
        } else if (match.team2 === null) {
          match.team2 = { name: '轮空 (Bye)' };
          match.winner = 'team2';
        }
      }
    }
  }

  updateMatchResult(tournament: Tournament, matchId: string, updates: Partial<Match>): Tournament {
    const match = tournament.matches.find(m => m.id === matchId);
    if (!match) {
      return tournament;
    }

    Object.assign(match, updates);

    if (updates.score1 !== undefined && updates.score2 !== undefined) {
      const score1 = updates.score1;
      const score2 = updates.score2;
      
      if (score1 !== null && score2 !== null) {
        match.winner = score1 > score2 ? 'team1' : 
                       score1 < score2 ? 'team2' : null;
      }
    }

    this.propagateWinner(tournament, match);

    return {
      ...tournament,
      updatedAt: new Date().toISOString()
    };
  }

  private propagateWinner(tournament: Tournament, match: Match): void {
    if (!match.nextMatchId || !match.winner) {
      return;
    }

    const nextMatch = tournament.matches.find(m => m.id === match.nextMatchId);
    if (!nextMatch) {
      return;
    }

    const winnerTeam = match.winner === 'team1' ? match.team1 : match.team2;
    if (!winnerTeam) {
      return;
    }

    const sourceMatches = tournament.matches.filter(m => m.nextMatchId === match.nextMatchId);
    const isFirstMatch = sourceMatches.indexOf(match) === 0;

    if (isFirstMatch) {
      nextMatch.team1 = winnerTeam;
    } else {
      nextMatch.team2 = winnerTeam;
    }
  }

  validateDates(startDate: string, endDate: string): boolean {
    if (!startDate || !endDate) {
      return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }

    return start <= end;
  }

  validateTeamCount(count: number): boolean {
    if (count <= 0 || count > 64) {
      return false;
    }
    return true;
  }

  isPowerOfTwo(count: number): boolean {
    return count > 0 && (count & (count - 1)) === 0;
  }
}
