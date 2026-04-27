import { Injectable } from '@angular/core';
import { LevelConfig, GameNode, NodeType, GAME_CONFIG, GameExit, Point } from '../types';
import { GameUtils } from '../utils/game.utils';

@Injectable({
  providedIn: 'root',
})
export class LevelDataService {
  // 生成关卡配置
  getLevelConfig(levelNumber: number): LevelConfig {
    const baseConfig = this.getBaseLevelConfig(levelNumber);
    const nodes = this.generateNodes(baseConfig);
    const exit = this.generateExit(baseConfig);
    
    return {
      ...baseConfig,
      nodes,
      exit,
      requiredNodeCombinations: this.generateRequiredCombinations(nodes, levelNumber),
    };
  }

  // 获取基础关卡配置
  private getBaseLevelConfig(levelNumber: number): Omit<LevelConfig, 'nodes' | 'exit' | 'requiredNodeCombinations'> {
    // 根据关卡号调整难度
    const difficulty = Math.min(levelNumber, 10);
    
    // 迷宫大小随关卡增加
    const baseRows = 5;
    const baseCols = 5;
    const rows = baseRows + Math.floor(difficulty / 2);
    const cols = baseCols + Math.floor(difficulty / 2);
    
    // 光照半径随关卡减小（增加难度）
    const lightRadius = Math.max(100, GAME_CONFIG.LIGHT_RADIUS - (difficulty - 1) * 10);
    
    // 玩家起始位置（通常在左上角附近）
    const playerStart: Point = { x: 0, y: 0 };
    
    return {
      levelNumber,
      mazeRows: rows,
      mazeCols: cols,
      playerStart,
      lightRadius,
    };
  }

  // 生成游戏节点
  private generateNodes(
    baseConfig: Omit<LevelConfig, 'nodes' | 'exit' | 'requiredNodeCombinations'>
  ): GameNode[] {
    const nodes: GameNode[] = [];
    const { mazeRows, mazeCols, levelNumber } = baseConfig;
    
    // 根据关卡号确定节点数量
    const nodeCount = Math.min(2 + Math.floor(levelNumber / 2), 6);
    
    // 生成可用的单元格位置（排除起始位置和边界）
    const availableCells = this.getAvailableCellsForNodes(mazeRows, mazeCols);
    
    // 随机选择节点位置
    const selectedCells = GameUtils.shuffle(availableCells).slice(0, nodeCount);
    
    // 为每个位置创建节点
    selectedCells.forEach((cell, index) => {
      const nodeType = this.getNodeTypeForLevel(levelNumber, index);
      
      const node: GameNode = {
        id: `node-${GameUtils.generateId()}`,
        row: cell.row,
        col: cell.col,
        type: nodeType,
        activated: false,
      };
      
      // 为顺序节点设置顺序
      if (nodeType === NodeType.Sequence) {
        node.sequenceOrder = index + 1;
      }
      
      // 为切换节点设置依赖
      if (nodeType === NodeType.Toggle && index > 0) {
        node.requiredNodes = [nodes[0].id];
      }
      
      nodes.push(node);
    });
    
    return nodes;
  }

  // 获取可用于放置节点的单元格
  private getAvailableCellsForNodes(
    rows: number,
    cols: number
  ): { row: number; col: number }[] {
    const cells: { row: number; col: number }[] = [];
    
    // 排除起始位置（0,0）
    // 排除出口位置（右下角附近）
    const startRow = 0;
    const startCol = 0;
    const exitRow = rows - 1;
    const exitCol = cols - 1;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // 排除起始位置和出口位置
        if ((row === startRow && col === startCol) ||
            (row === exitRow && col === exitCol)) {
          continue;
        }
        
        // 优先选择离起始位置较远的位置
        const distanceFromStart = Math.abs(row - startRow) + Math.abs(col - startCol);
        if (distanceFromStart >= 2) {
          cells.push({ row, col });
        }
      }
    }
    
    // 如果没有足够的单元格，添加一些
    if (cells.length === 0) {
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (!(row === startRow && col === startCol) &&
              !(row === exitRow && col === exitCol)) {
            cells.push({ row, col });
          }
        }
      }
    }
    
    return cells;
  }

  // 根据关卡获取节点类型
  private getNodeTypeForLevel(levelNumber: number, index: number): NodeType {
    if (levelNumber <= 2) {
      // 前两关只有普通节点
      return NodeType.Normal;
    } else if (levelNumber <= 5) {
      // 3-5关：普通节点和顺序节点
      return index === 0 ? NodeType.Normal : NodeType.Sequence;
    } else {
      // 6关及以上：所有类型节点
      const types = [NodeType.Normal, NodeType.Sequence, NodeType.Toggle];
      return types[index % types.length];
    }
  }

  // 生成出口位置
  private generateExit(
    baseConfig: Omit<LevelConfig, 'nodes' | 'exit' | 'requiredNodeCombinations'>
  ): GameExit {
    // 出口通常在迷宫的右下角
    return {
      row: baseConfig.mazeRows - 1,
      col: baseConfig.mazeCols - 1,
      unlocked: false,
    };
  }

  // 生成解锁出口所需的节点组合
  private generateRequiredCombinations(
    nodes: GameNode[],
    levelNumber: number
  ): string[][] {
    if (nodes.length === 0) {
      return [];
    }
    
    // 简单关卡：只需激活所有节点
    if (levelNumber <= 3) {
      return [nodes.map(n => n.id)];
    }
    
    // 中等难度：需要激活特定组合
    if (levelNumber <= 6) {
      // 例如：需要激活节点1和节点3，或者节点2和节点4
      const combinations: string[][] = [];
      const normalNodes = nodes.filter(n => n.type === NodeType.Normal);
      
      if (normalNodes.length >= 2) {
        combinations.push([normalNodes[0].id, normalNodes[1].id]);
      } else {
        combinations.push(nodes.map(n => n.id));
      }
      
      return combinations;
    }
    
    // 高难度：更复杂的组合
    const sequenceNodes = nodes.filter(n => n.type === NodeType.Sequence);
    if (sequenceNodes.length >= 2) {
      // 顺序节点需要按顺序激活
      return [sequenceNodes.sort((a, b) => 
        (a.sequenceOrder || 0) - (b.sequenceOrder || 0)
      ).map(n => n.id)];
    }
    
    // 默认：需要所有节点
    return [nodes.map(n => n.id)];
  }

  // 获取总关卡数
  getTotalLevels(): number {
    return 10;
  }

  // 获取关卡描述
  getLevelDescription(levelNumber: number): string {
    const descriptions: { [key: number]: string } = {
      1: '探索迷宫，激活所有黄色节点，找到紫色出口。',
      2: '迷宫变大了，仔细寻找所有节点。',
      3: '节点需要按顺序激活，注意观察。',
      4: '光照范围减小，更加依赖记忆和探索。',
      5: '更多节点，更复杂的路径。',
      6: '引入切换节点，需要特定顺序。',
      7: '迷宫变得复杂，考验你的方向感。',
      8: '高难度关卡，需要精确的策略。',
      9: '终极挑战，祝你好运！',
      10: '最终关卡，成为光点迷阵大师！',
    };
    
    return descriptions[levelNumber] || '探索迷宫，激活节点，找到出口！';
  }
}
