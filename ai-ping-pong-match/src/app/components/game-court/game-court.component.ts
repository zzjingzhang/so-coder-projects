import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameState } from '../../types/game.types';

@Component({
  selector: 'app-game-court',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="relative bg-court-green rounded-lg shadow-2xl overflow-hidden"
      [style.width.px]="tableWidth()"
      [style.height.px]="tableHeight()"
    >
      <div class="absolute inset-0 border-8 border-white rounded-lg"></div>
      
      <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-white opacity-60"></div>
      
      <div class="absolute top-0 bottom-0 left-1/2 w-1 bg-white opacity-40" 
           style="transform: translateX(-50%);"></div>
      
      <div class="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white opacity-30 rounded-full"
           style="transform: translate(-50%, -50%);"></div>
      
      <div 
        class="absolute bg-ball-yellow rounded-full shadow-lg"
        [style.width.px]="ballRadius() * 2"
        [style.height.px]="ballRadius() * 2"
        [style.left.px]="ballX() - ballRadius()"
        [style.top.px]="ballY() - ballRadius()"
        [class.opacity-50]="gameState() !== GameState.PLAYING"
      >
        <div class="absolute inset-1 bg-yellow-300 rounded-full opacity-60"></div>
      </div>
      
      <div 
        class="absolute bg-player-red rounded-sm shadow-lg"
        [style.width.px]="paddle1Width()"
        [style.height.px]="paddle1Height()"
        [style.left.px]="paddle1X()"
        [style.top.px]="paddle1Y()"
      >
        <div class="absolute inset-y-0 left-0 w-1 bg-red-400 opacity-60 rounded-l-sm"></div>
      </div>
      
      <div 
        class="absolute bg-player-blue rounded-sm shadow-lg"
        [style.width.px]="paddle2Width()"
        [style.height.px]="paddle2Height()"
        [style.left.px]="paddle2X()"
        [style.top.px]="paddle2Y()"
      >
        <div class="absolute inset-y-0 right-0 w-1 bg-blue-400 opacity-60 rounded-r-sm"></div>
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center" *ngIf="gameState() === GameState.IDLE">
        <div class="bg-black bg-opacity-70 text-white px-8 py-4 rounded-lg text-center">
          <p class="text-xl font-bold">准备开始</p>
          <p class="text-sm mt-2 opacity-80">点击下方按钮开始比赛</p>
        </div>
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center" *ngIf="gameState() === GameState.PAUSED">
        <div class="bg-black bg-opacity-70 text-white px-8 py-4 rounded-lg text-center">
          <p class="text-xl font-bold">比赛暂停</p>
          <p class="text-sm mt-2 opacity-80">点击继续按钮恢复比赛</p>
        </div>
      </div>
      
      <div class="absolute inset-0 flex items-center justify-center" *ngIf="gameState() === GameState.FINISHED">
        <div class="bg-black bg-opacity-80 text-white px-12 py-8 rounded-lg text-center">
          <p class="text-3xl font-bold mb-2">🏆 比赛结束</p>
          <p class="text-2xl mt-2" [class.text-player-red]="winnerId() === 1" [class.text-player-blue]="winnerId() === 2">
            {{ winnerName() }} 获胜！
          </p>
          <p class="text-lg mt-4 opacity-80">
            最终比分: {{ player1Score() }} - {{ player2Score() }}
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class GameCourtComponent {
  private gameService = inject(GameService);
  
  public GameState = GameState;
  
  public tableWidth = computed(() => this.gameService.tableDimensions().width);
  public tableHeight = computed(() => this.gameService.tableDimensions().height);
  
  public ballX = computed(() => this.gameService.ball().position.x);
  public ballY = computed(() => this.gameService.ball().position.y);
  public ballRadius = computed(() => this.gameService.ball().radius);
  
  public paddle1X = computed(() => this.gameService.player1().paddle.position.x);
  public paddle1Y = computed(() => this.gameService.player1().paddle.position.y);
  public paddle1Width = computed(() => this.gameService.player1().paddle.width);
  public paddle1Height = computed(() => this.gameService.player1().paddle.height);
  
  public paddle2X = computed(() => this.gameService.player2().paddle.position.x);
  public paddle2Y = computed(() => this.gameService.player2().paddle.position.y);
  public paddle2Width = computed(() => this.gameService.player2().paddle.width);
  public paddle2Height = computed(() => this.gameService.player2().paddle.height);
  
  public player1Score = computed(() => this.gameService.player1().score);
  public player2Score = computed(() => this.gameService.player2().score);
  
  public gameState = computed(() => this.gameService.gameState());
  public winner = computed(() => this.gameService.winner());
  
  public winnerId = computed(() => this.winner()?.id ?? null);
  public winnerName = computed(() => this.winner()?.name ?? '');
  
  constructor() {
    effect(() => {
      console.log('Game state changed:', this.gameState());
    });
  }
}
