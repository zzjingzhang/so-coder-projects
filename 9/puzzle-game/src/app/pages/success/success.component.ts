import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PuzzleService } from '../../services/puzzle.service';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [
    NzButtonModule,
    NzCardModule,
    NzIconModule,
  ],
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
})
export class SuccessComponent {
  readonly gameState = computed(() => this.puzzleService.gameState());
  readonly currentImage = computed(() => this.puzzleService.getCurrentImage());

  constructor(
    private readonly router: Router,
    private readonly puzzleService: PuzzleService,
  ) {}

  playAgain(): void {
    this.puzzleService.resetGame();
    this.router.navigate(['/game']);
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  formatTime(seconds: number): string {
    return this.puzzleService.formatTime(seconds);
  }

  getDifficultyLabel(gridSize: number): string {
    switch (gridSize) {
      case 3:
        return '简单';
      case 4:
        return '中等';
      case 5:
        return '困难';
      default:
        return '自定义';
    }
  }
}
