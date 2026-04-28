export interface EscapeRoom {
  id: string;
  name: string;
  theme: string;
  difficulty: DifficultyLevel;
  description: string;
  estimatedTime: number;
  location: string;
  imageUrl?: string;
}

export interface EscapeRecord {
  id: string;
  roomId: string;
  roomName: string;
  escapeTime: number;
  escaped: boolean;
  teamMembers: string[];
  teamCoordination: TeamCoordination;
  notes: string;
  date: string;
  hintsUsed: number;
}

export type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

export type TeamCoordination = 'excellent' | 'good' | 'average' | 'poor';
