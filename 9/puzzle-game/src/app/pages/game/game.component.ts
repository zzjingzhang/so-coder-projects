import { Component, computed, effect, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { PuzzleService, PuzzlePiece } from '../../services/puzzle.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    CommonModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnDestroy {
  readonly gameState = computed(() => this.puzzleService.gameState());
  readonly currentImage = computed(() => this.puzzleService.getCurrentImage());
  readonly gridSize = computed(() => this.gameState().gridSize);
  readonly pieceSize = computed(() => 400 / this.gridSize());

  readonly sortedPieces = computed(() => {
    const pieces = [...this.gameState().pieces];
    return pieces.sort((a, b) => a.currentIndex - b.currentIndex);
  });

  constructor(
    private readonly router: Router,
    private readonly puzzleService: PuzzleService,
    private readonly modalService: NzModalService,
  ) {
    effect(() => {
      if (this.gameState().isCompleted) {
        setTimeout(() => {
          this.router.navigate(['/success']);
        }, 1000);
      }
    });
  }

  ngOnDestroy(): void {}

  goHome(): void {
    this.modalService.confirm({
      nzTitle: '确认返回',
      nzContent: '返回首页将丢失当前游戏进度，确定要返回吗？',
      nzOnOk: () => {
        this.router.navigate(['/']);
      },
    });
  }

  resetGame(): void {
    this.modalService.confirm({
      nzTitle: '确认重置',
      nzContent: '确定要重新开始当前游戏吗？',
      nzOnOk: () => {
        this.puzzleService.resetGame();
      },
    });
  }

  selectPiece(index: number): void {
    this.puzzleService.selectPiece(index);
  }

  getPieceBackgroundPosition(piece: PuzzlePiece): string {
    const gridSize = this.gridSize();
    const originalRow = Math.floor(piece.originalIndex / gridSize);
    const originalCol = piece.originalIndex % gridSize;
    const pieceSize = 100 / (gridSize - 1);
    return `${originalCol * pieceSize}% ${originalRow * pieceSize}%`;
  }

  isSelected(index: number): boolean {
    return this.gameState().selectedPiece === index;
  }

  formatTime(seconds: number): string {
    return this.puzzleService.formatTime(seconds);
  }
}
