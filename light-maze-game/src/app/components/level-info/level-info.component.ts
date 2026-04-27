import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';
import { GameState } from '../../types';

@Component({
  selector: 'app-level-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-info.component.html',
  styleUrl: './level-info.component.css',
})
export class LevelInfoComponent {
  private gameLogicService = inject(GameLogicService);

  currentLevel = this.gameLogicService.currentLevel;
  totalLevels = this.gameLogicService.totalLevels;
  gameState = this.gameLogicService.gameState;
  gameNodes = this.gameLogicService.gameNodes;
  exitUnlocked = this.gameLogicService.exitUnlocked;

  // 计算已激活的节点数
  activatedNodesCount = computed(() => {
    const nodes = this.gameNodes();
    return nodes.filter(n => n.activated).length;
  });

  // 计算总节点数
  totalNodesCount = computed(() => {
    return this.gameNodes().length;
  });

  // 是否显示关卡信息
  shouldShow = computed(() => {
    const state = this.gameState();
    return state === GameState.Playing || state === GameState.LevelComplete;
  });

  // 获取关卡描述
  getLevelDescription(): string {
    return this.gameLogicService.getLevelDescription();
  }
}
