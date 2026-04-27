import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCourtComponent } from '../../components/game-court/game-court.component';
import { ScoreboardComponent } from '../../components/scoreboard/scoreboard.component';
import { ControlPanelComponent } from '../../components/control-panel/control-panel.component';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [CommonModule, GameCourtComponent, ScoreboardComponent, ControlPanelComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">🏓 AI 乒乓球对决</h1>
          <p class="text-gray-400">两位 AI 选手之间的精彩对决</p>
        </div>
        
        <div class="space-y-6">
          <app-scoreboard></app-scoreboard>
          
          <div class="flex justify-center">
            <app-game-court></app-game-court>
          </div>
          
          <app-control-panel></app-control-panel>
        </div>
        
        <div class="mt-8 text-center">
          <div class="inline-flex items-center gap-6 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-player-red"></div>
              <span>AI 选手 1</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full bg-player-blue"></div>
              <span>AI 选手 2</span>
            </div>
          </div>
          <p class="mt-2 text-gray-600 text-xs">
            提示：调整 AI 难度可以改变比赛的激烈程度
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class GamePageComponent {}
