import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';
import { GameState } from '../../types';

@Component({
  selector: 'app-level-complete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-complete.component.html',
  styleUrl: './level-complete.component.css',
})
export class LevelCompleteComponent {
  private gameLogicService = inject(GameLogicService);

  gameState = this.gameLogicService.gameState;
  currentLevel = this.gameLogicService.currentLevel;
  totalLevels = this.gameLogicService.totalLevels;
  activatedNodesCount = this.gameLogicService.gameNodes;

  // 是否显示关卡完成界面
  shouldShow = inject(() => {
    return this.gameState() === GameState.LevelComplete;
  });

  // 是否是最后一关
  isLastLevel = inject(() => {
    return this.currentLevel() >= this.totalLevels();
  });

  // 下一关
  nextLevel(): void {
    this.gameLogicService.nextLevel();
  }

  // 重新开始
  restartLevel(): void {
    this.gameLogicService.restartLevel();
  }

  // 计算已激活的节点数
  getActivatedCount(): number {
    return this.activatedNodesCount().filter(n => n.activated).length;
  }

  // 获取总节点数
  getTotalNodes(): number {
    return this.activatedNodesCount().length;
  }
}
