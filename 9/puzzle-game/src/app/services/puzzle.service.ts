import { Injectable, signal } from '@angular/core';

export interface PuzzlePiece {
  id: number;
  currentIndex: number;
  originalIndex: number;
  isCorrect: boolean;
}

export interface GameState {
  pieces: PuzzlePiece[];
  gridSize: number;
  moves: number;
  time: number;
  isCompleted: boolean;
  selectedPiece: number | null;
  isPlaying: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PuzzleService {
  readonly gameState = signal<GameState>({
    pieces: [],
    gridSize: 3,
    moves: 0,
    time: 0,
    isCompleted: false,
    selectedPiece: null,
    isPlaying: false,
  });

  private timerInterval: any = null;
  private readonly images = [
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20mountain%20landscape%20with%20lake%20and%20forest%20in%20autumn%20colors%20nature%20photography&image_size=square_hd',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=colorful%20sunset%20over%20the%20ocean%20waves%20beach%20palm%20trees%20tropical%20paradise&image_size=square_hd',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cherry%20blossom%20flowers%20spring%20season%20pink%20petals%20japanese%20garden%20peaceful&image_size=square_hd',
    'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=northern%20lights%20aurora%20borealis%20night%20sky%20stars%20snowy%20mountains%20magical&image_size=square_hd',
  ];

  currentImageIndex = signal(0);

  getImages(): string[] {
    return this.images;
  }

  setCurrentImage(index: number): void {
    this.currentImageIndex.set(index);
  }

  getCurrentImage(): string {
    return this.images[this.currentImageIndex()];
  }

  startNewGame(gridSize: number = 3): void {
    this.stopTimer();
    
    const state = this.gameState();
    const totalPieces = gridSize * gridSize;
    const pieces: PuzzlePiece[] = [];

    for (let i = 0; i < totalPieces; i++) {
      pieces.push({
        id: i,
        currentIndex: i,
        originalIndex: i,
        isCorrect: true,
      });
    }

    this.shufflePieces(pieces);

    this.gameState.set({
      ...state,
      pieces,
      gridSize,
      moves: 0,
      time: 0,
      isCompleted: false,
      selectedPiece: null,
      isPlaying: true,
    });

    this.startTimer();
  }

  private shufflePieces(pieces: PuzzlePiece[]): void {
    const indices = pieces.map((_, i) => i);
    
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    if (this.isSameOrder(indices)) {
      [indices[0], indices[1]] = [indices[1], indices[0]];
    }

    indices.forEach((currentIndex, originalIndex) => {
      pieces[originalIndex].currentIndex = currentIndex;
      pieces[originalIndex].isCorrect = currentIndex === originalIndex;
    });
  }

  private isSameOrder(arr: number[]): boolean {
    return arr.every((val, idx) => val === idx);
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      const state = this.gameState();
      if (state.isPlaying && !state.isCompleted) {
        this.gameState.set({
          ...state,
          time: state.time + 1,
        });
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  selectPiece(index: number): void {
    const state = this.gameState();
    
    if (!state.isPlaying || state.isCompleted) return;

    if (state.selectedPiece === null) {
      this.gameState.set({
        ...state,
        selectedPiece: index,
      });
    } else if (state.selectedPiece === index) {
      this.gameState.set({
        ...state,
        selectedPiece: null,
      });
    } else {
      this.swapPieces(state.selectedPiece, index);
    }
  }

  swapPieces(index1: number, index2: number): void {
    const state = this.gameState();
    
    const piece1 = state.pieces.find((p) => p.currentIndex === index1)!;
    const piece2 = state.pieces.find((p) => p.currentIndex === index2)!;

    [piece1.currentIndex, piece2.currentIndex] = [
      piece2.currentIndex,
      piece1.currentIndex,
    ];

    piece1.isCorrect = piece1.currentIndex === piece1.originalIndex;
    piece2.isCorrect = piece2.currentIndex === piece2.originalIndex;

    const newMoves = state.moves + 1;
    const isCompleted = state.pieces.every((p) => p.isCorrect);

    this.gameState.set({
      ...state,
      pieces: [...state.pieces],
      moves: newMoves,
      selectedPiece: null,
      isCompleted,
      isPlaying: !isCompleted,
    });

    if (isCompleted) {
      this.stopTimer();
    }
  }

  resetGame(): void {
    this.startNewGame(this.gameState().gridSize);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
