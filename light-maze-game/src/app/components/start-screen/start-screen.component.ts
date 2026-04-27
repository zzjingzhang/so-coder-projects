import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';
import { GameState } from '../../types';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.css',
})
export class StartScreenComponent {
  private gameLogicService = inject(GameLogicService);
  gameState = this.gameLogicService.gameState;

  // 显示开始界面的条件
  shouldShow = inject(() => {
    const state = this.gameState();
    return state === GameState.Start || state === GameState.GameOver;
  });

  isGameOver = inject(() => {
    return this.gameState() === GameState.GameOver;
  });

  startGame(): void {
    this.gameLogicService.startGame();
  }

  restartGame(): void {
    this.gameLogicService.startGame();
  }
}
