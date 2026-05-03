export interface Team {
  name: string;
}

export interface Match {
  id: string;
  round: number;
  position: number;
  team1: Team | null;
  team2: Team | null;
  score1: number | null;
  score2: number | null;
  matchDate: string | null;
  winner: 'team1' | 'team2' | null;
  nextMatchId: string | null;
}

export interface Tournament {
  name: string;
  startDate: string;
  endDate: string;
  teamCount: number;
  rounds: number;
  matches: Match[];
  createdAt: string;
  updatedAt: string;
}

export interface TournamentFormData {
  name: string;
  startDate: string;
  endDate: string;
  teamCount: number;
}

export interface FormValidationErrors {
  startDate?: string;
  endDate?: string;
  teamCount?: string;
  general?: string;
}
