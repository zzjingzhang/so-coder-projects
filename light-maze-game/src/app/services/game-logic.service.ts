import { Injectable, signal, computed } from '@angular/core';
import {
  PlayerState,
  GameState,
  LevelConfig,
  MazeCell,
  Direction,
  GameNode,
  NodeType,
  GAME_CONFIG,
  Point,
  GameExit,
} from '../types';
import { GameUtils } from '../utils/game.utils';
import { MazeGeneratorService } from './maze-generator.service';
import { LevelDataService } from './level-data.service';

@Injectable({
  providedIn: 'root',
})
export class GameLogicService {
  // 游戏状态
  private readonly _gameState = signal<GameState>(GameState.Start);
  readonly gameState = computed(() => this._gameState());

  // 当前关卡
  private readonly _currentLevel = signal<number>(1);
  readonly currentLevel = computed(() => this._currentLevel());

  // 玩家状态
  private readonly _playerState = signal<PlayerState>({
    row: 0,
    col: 0,
    x: 0,
    y: 0,
    isMoving: false,
  });
  readonly playerState = computed(() => this._playerState());

  // 迷宫网格
  private readonly _mazeGrid = signal<MazeCell[][]>([]);
  readonly mazeGrid = computed(() => this._mazeGrid());

  // 关卡配置
  private readonly _levelConfig = signal<LevelConfig | null>(null);
  readonly levelConfig = computed(() => this._levelConfig());

  // 游戏节点
  private readonly _gameNodes = signal<GameNode[]>([]);
  readonly gameNodes = computed(() => this._gameNodes());

  // 出口状态
  private readonly _exitState = signal<GameExit | null>(null);
  readonly exitState = computed(() => this._exitState());

  // 激活的节点顺序
  private readonly _activatedNodeOrder = signal<string[]>([]);
  readonly activatedNodeOrder = computed(() => this._activatedNodeOrder());

  // 出口是否解锁
  readonly exitUnlocked = computed(() => {
    const exit = this._exitState();
    return exit?.unlocked ?? false;
  });

  // 总关卡数
  readonly totalLevels = computed(() => this.levelDataService.getTotalLevels());

  constructor(
    private mazeGeneratorService: MazeGeneratorService,
    private levelDataService: LevelDataService
  ) {}

  // 开始新游戏
  startGame(): void {
    this._currentLevel.set(1);
    this.loadLevel(1);
  }

  // 加载关卡
  loadLevel(levelNumber: number): void {
    // 获取关卡配置
    const levelConfig = this.levelDataService.getLevelConfig(levelNumber);
    this._levelConfig.set(levelConfig);

    // 生成迷宫
    const maze = this.mazeGeneratorService.generate(
      levelConfig.mazeRows,
      levelConfig.mazeCols
    );
    this._mazeGrid.set(maze);

    // 初始化玩家位置
    const playerPixelPos = GameUtils.gridToPixel(
      levelConfig.playerStart.y,
      levelConfig.playerStart.x
    );
    this._playerState.set({
      row: levelConfig.playerStart.y,
      col: levelConfig.playerStart.x,
      x: playerPixelPos.x,
      y: playerPixelPos.y,
      isMoving: false,
    });

    // 初始化节点
    this._gameNodes.set(levelConfig.nodes.map(n => ({ ...n, activated: false })));

    // 初始化出口
    this._exitState.set({ ...levelConfig.exit, unlocked: false });

    // 重置激活顺序
    this._activatedNodeOrder.set([]);

    // 设置游戏状态
    this._gameState.set(GameState.Playing);
  }

  // 移动玩家
  movePlayer(direction: Direction): void {
    if (this._gameState() !== GameState.Playing) return;

    const player = this._playerState();
    const maze = this._mazeGrid();

    // 检查是否可以移动
    if (this.mazeGeneratorService.canMove(maze, player.row, player.col, direction)) {
      // 计算新位置
      const directionVector = GameUtils.getDirectionVector(direction);
      const newRow = player.row + directionVector.y;
      const newCol = player.col + directionVector.x;

      // 转换为像素坐标
      const newPixelPos = GameUtils.gridToPixel(newRow, newCol);

      // 更新玩家状态
      this._playerState.set({
        ...player,
        row: newRow,
        col: newCol,
        x: newPixelPos.x,
        y: newPixelPos.y,
        isMoving: true,
      });

      // 检查是否激活节点
      this.checkNodeActivation(newRow, newCol);

      // 检查是否到达出口
      this.checkExitReached(newRow, newCol);

      // 移动完成后重置isMoving
      setTimeout(() => {
        this._playerState.update(state => ({ ...state, isMoving: false }));
      }, 100);
    }
  }

  // 点击位置移动
  moveToPosition(targetX: number, targetY: number): void {
    if (this._gameState() !== GameState.Playing) return;

    const player = this._playerState();
    const maze = this._mazeGrid();

    // 计算目标网格位置
    const targetGrid = GameUtils.pixelToGrid(targetX, targetY);
    const currentGrid = { row: player.row, col: player.col };

    // 计算方向
    let direction: Direction | null = null;

    if (targetGrid.row < currentGrid.row) {
      direction = Direction.Up;
    } else if (targetGrid.row > currentGrid.row) {
      direction = Direction.Down;
    } else if (targetGrid.col < currentGrid.col) {
      direction = Direction.Left;
    } else if (targetGrid.col > currentGrid.col) {
      direction = Direction.Right;
    }

    if (direction) {
      this.movePlayer(direction);
    }
  }

  // 检查节点激活
  private checkNodeActivation(row: number, col: number): void {
    const nodes = this._gameNodes();
    const activatedOrder = this._activatedNodeOrder();

    // 查找当前位置的节点
    const nodeIndex = nodes.findIndex(n => n.row === row && n.col === col && !n.activated);
    
    if (nodeIndex === -1) return;

    const node = nodes[nodeIndex];

    // 检查是否可以激活
    if (this.canActivateNode(node, activatedOrder)) {
      // 激活节点
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = { ...node, activated: true };
      this._gameNodes.set(updatedNodes);

      // 更新激活顺序
      this._activatedNodeOrder.update(order => [...order, node.id]);

      // 检查是否解锁出口
      this.checkExitUnlock();
    }
  }

  // 检查是否可以激活节点
  private canActivateNode(node: GameNode, activatedOrder: string[]): boolean {
    // 检查依赖节点
    if (node.requiredNodes && node.requiredNodes.length > 0) {
      const allRequiredActivated = node.requiredNodes.every(id =>
        activatedOrder.includes(id)
      );
      if (!allRequiredActivated) return false;
    }

    // 检查顺序节点
    if (node.type === NodeType.Sequence && node.sequenceOrder !== undefined) {
      // 顺序节点需要按顺序激活
      const expectedSequence = node.sequenceOrder - 1;
      const actualSequence = activatedOrder.length;
      return expectedSequence === actualSequence;
    }

    return true;
  }

  // 检查是否解锁出口
  private checkExitUnlock(): void {
    const levelConfig = this._levelConfig();
    if (!levelConfig) return;

    const activatedOrder = this._activatedNodeOrder();
    const requiredCombinations = levelConfig.requiredNodeCombinations;

    // 检查是否满足任何一个组合
    let unlocked = false;

    if (requiredCombinations.length === 0) {
      // 没有节点要求，直接解锁
      unlocked = true;
    } else {
      for (const combination of requiredCombinations) {
        // 检查组合中的所有节点是否都已激活
        const allActivated = combination.every(id => activatedOrder.includes(id));
        if (allActivated) {
          unlocked = true;
          break;
        }
      }
    }

    if (unlocked) {
      this._exitState.update(exit => exit ? { ...exit, unlocked: true } : null);
    }
  }

  // 检查是否到达出口
  private checkExitReached(row: number, col: number): void {
    const exit = this._exitState();
    if (!exit || !exit.unlocked) return;

    if (exit.row === row && exit.col === col) {
      // 到达出口，关卡完成
      this._gameState.set(GameState.LevelComplete);
    }
  }

  // 下一关
  nextLevel(): void {
    const currentLevel = this._currentLevel();
    const totalLevels = this.totalLevels();

    if (currentLevel < totalLevels) {
      const nextLevelNum = currentLevel + 1;
      this._currentLevel.set(nextLevelNum);
      this.loadLevel(nextLevelNum);
    } else {
      // 游戏完成
      this._gameState.set(GameState.GameOver);
    }
  }

  // 重新开始当前关卡
  restartLevel(): void {
    const currentLevel = this._currentLevel();
    this.loadLevel(currentLevel);
  }

  // 获取迷宫宽度（像素）
  getMazeWidth(): number {
    const config = this._levelConfig();
    if (!config) return 0;
    return config.mazeCols * GAME_CONFIG.CELL_SIZE;
  }

  // 获取迷宫高度（像素）
  getMazeHeight(): number {
    const config = this._levelConfig();
    if (!config) return 0;
    return config.mazeRows * GAME_CONFIG.CELL_SIZE;
  }

  // 获取关卡描述
  getLevelDescription(): string {
    const level = this._currentLevel();
    return this.levelDataService.getLevelDescription(level);
  }
}
