import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameState } from '../../types/game.types';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 text-white p-6 rounded-xl shadow-lg">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-4">
          <div class="w-4 h-4 rounded-full bg-player-red" [class.animate-pulse]="lastScorer() === 1"></div>
          <span class="text-lg font-bold">{{ player1Name() }}</span>
        </div>
        
        <div class="flex items-center gap-6">
          <div class="text-center">
            <span class="text-5xl font-bold" [class.text-player-red]="lastScorer() === 1" [class.opacity-70]="lastScorer() !== 1 && lastScorer() !== null">
              {{ player1Score() }}
            </span>
          </div>
          
          <div class="text-3xl font-bold opacity-50">:</div>
          
          <div class="text-center">
            <span class="text-5xl font-bold" [class.text-player-blue]="lastScorer() === 2" [class.opacity-70]="lastScorer() !== 2 && lastScorer() !== null">
              {{ player2Score() }}
            </span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <span class="text-lg font-bold">{{ player2Name() }}</span>
          <div class="w-4 h-4 rounded-full bg-player-blue" [class.animate-pulse]="lastScorer() === 2"></div>
        </div>
      </div>
      
      <div class="flex items-center justify-center gap-4 text-sm opacity-70">
        <span>先得 {{ winningScore() }} 分获胜</span>
        <span>|</span>
        <span [class.text-yellow-400]="gameState() === GameState.PLAYING"
              [class.text-blue-400]="gameState() === GameState.PAUSED"
              [class.text-gray-500]="gameState() === GameState.IDLE || gameState() === GameState.FINISHED">
          {{ getGameStateText() }}
        </span>
      </div>
    </div>
  `,
  styles: []
})
export class ScoreboardComponent {
  private gameService = inject(GameService);
  
  public GameState = GameState;
  
  public player1Name = computed(() => this.gameService.player1().name);
  public player2Name = computed(() => this.gameService.player2().name);
  
  public player1Score = computed(() => this.gameService.player1().score);
  public player2Score = computed(() => this.gameService.player2().score);
  
  public winningScore = computed(() => this.gameService.settings().winningScore);
  public gameState = computed(() => this.gameService.gameState());
  public lastScorer = computed(() => this.gameService.lastScorer());
  
  public getGameStateText(): string {
    switch (this.gameState()) {
      case GameState.IDLE:
        return '等待开始';
      case GameState.PLAYING:
        return '比赛进行中';
      case GameState.PAUSED:
        return '已暂停';
      case GameState.FINISHED:
        return '比赛结束';
      default:
        return '';
    }
  }
}
