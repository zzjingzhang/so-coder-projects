import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { GameState } from '../../types/game.types';

interface DifficultyOption {
  label: string;
  value: 'easy' | 'medium' | 'hard';
}

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormsModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <label class="text-sm font-medium text-gray-700">AI 难度:</label>
          <select 
            [(ngModel)]="selectedDifficulty"
            [disabled]="gameState() === GameState.PLAYING"
            (change)="onDifficultyChange()"
            class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[150px]"
          >
            @for (option of difficultyOptions; track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
        </div>
        
        <div class="flex items-center gap-3">
          <button 
            pButton 
            label="开始比赛" 
            icon="pi pi-play"
            class="p-button-success"
            *ngIf="gameState() === GameState.IDLE || gameState() === GameState.FINISHED"
            (click)="startGame()"
          ></button>
          
          <button 
            pButton 
            label="暂停" 
            icon="pi pi-pause"
            class="p-button-warning"
            *ngIf="gameState() === GameState.PLAYING"
            (click)="pauseGame()"
          ></button>
          
          <button 
            pButton 
            label="继续" 
            icon="pi pi-play"
            class="p-button-info"
            *ngIf="gameState() === GameState.PAUSED"
            (click)="resumeGame()"
          ></button>
          
          <button 
            pButton 
            label="重置" 
            icon="pi pi-refresh"
            class="p-button-danger"
            *ngIf="gameState() !== GameState.IDLE"
            (click)="resetGame()"
          ></button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ControlPanelComponent {
  private gameService = inject(GameService);
  
  public GameState = GameState;
  
  public gameState = computed(() => this.gameService.gameState());
  
  public selectedDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
  
  public difficultyOptions: DifficultyOption[] = [
    { label: '简单', value: 'easy' },
    { label: '中等', value: 'medium' },
    { label: '困难', value: 'hard' }
  ];
  
  public startGame(): void {
    this.gameService.startGame();
  }
  
  public pauseGame(): void {
    this.gameService.pauseGame();
  }
  
  public resumeGame(): void {
    this.gameService.resumeGame();
  }
  
  public resetGame(): void {
    this.gameService.resetGame();
  }
  
  public onDifficultyChange(): void {
    this.gameService.setAIDifficulty(this.selectedDifficulty);
  }
}
