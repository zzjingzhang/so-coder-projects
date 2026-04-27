export type Region = 'A' | 'B' | 'C' | 'D';

export interface Bridge {
  id: number;
  from: Region;
  to: Region;
}

export interface GameState {
  currentPosition: Region | null;
  visitedBridges: number[];
  history: {
    position: Region;
    visitedBridges: number[];
  }[];
  gameStarted: boolean;
  message: string | null;
  messageType: 'info' | 'success' | 'error' | 'warning';
}
