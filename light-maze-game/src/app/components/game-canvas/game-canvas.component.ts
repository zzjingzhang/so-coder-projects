import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLogicService } from '../../services/game-logic.service';
import {
  GAME_CONFIG,
  GameNode,
  GameExit,
  MazeCell,
  PlayerState,
  Direction,
} from '../../types';
import { GameUtils } from '../../utils/game.utils';

@Component({
  selector: 'app-game-canvas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-canvas.component.html',
  styleUrl: './game-canvas.component.css',
})
export class GameCanvasComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('gameCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private gameLogicService = inject(GameLogicService);
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  // 响应式数据
  playerState = this.gameLogicService.playerState;
  mazeGrid = this.gameLogicService.mazeGrid;
  gameNodes = this.gameLogicService.gameNodes;
  exitState = this.gameLogicService.exitState;
  levelConfig = this.gameLogicService.levelConfig;
  exitUnlocked = this.gameLogicService.exitUnlocked;

  constructor() {
    // 使用effect监听状态变化
    effect(() => {
      this.render();
    });
  }

  ngOnInit(): void {
    this.setupEventListeners();
  }

  ngAfterViewInit(): void {
    this.initCanvas();
    this.setupResizeObserver();
    this.render();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // 初始化画布
  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  // 调整画布大小
  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (!container) return;

    const mazeWidth = this.gameLogicService.getMazeWidth();
    const mazeHeight = this.gameLogicService.getMazeHeight();

    // 计算缩放比例，保持迷宫比例
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const scaleX = containerWidth / mazeWidth;
    const scaleY = containerHeight / mazeHeight;
    const scale = Math.min(scaleX, scaleY, 1.5); // 最大放大1.5倍

    canvas.width = mazeWidth * scale;
    canvas.height = mazeHeight * scale;
    canvas.style.width = `${canvas.width}px`;
    canvas.style.height = `${canvas.height}px`;

    this.render();
  }

  // 设置调整大小观察者
  private setupResizeObserver(): void {
    const canvas = this.canvasRef.nativeElement;
    const container = canvas.parentElement;

    if (!container) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.resizeCanvas();
    });

    this.resizeObserver.observe(container);
  }

  // 设置事件监听器
  private setupEventListeners(): void {
    // 键盘事件
    window.addEventListener('keydown', this.handleKeyDown.bind(this));

    // 鼠标点击事件
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      canvas.addEventListener('click', this.handleCanvasClick.bind(this));
    }
  }

  // 处理键盘事件
  private handleKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        event.preventDefault();
        this.gameLogicService.movePlayer(Direction.Up);
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        event.preventDefault();
        this.gameLogicService.movePlayer(Direction.Down);
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        event.preventDefault();
        this.gameLogicService.movePlayer(Direction.Left);
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        event.preventDefault();
        this.gameLogicService.movePlayer(Direction.Right);
        break;
    }
  }

  // 处理画布点击
  private handleCanvasClick(event: MouseEvent): void {
    const canvas = this.canvasRef.nativeElement;
    const rect = canvas.getBoundingClientRect();

    // 计算点击相对于画布的位置
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    // 转换为迷宫坐标
    const mazeWidth = this.gameLogicService.getMazeWidth();
    const mazeHeight = this.gameLogicService.getMazeHeight();
    const scaleX = canvas.width / mazeWidth;
    const scaleY = canvas.height / mazeHeight;

    const mazeX = clickX / scaleX;
    const mazeY = clickY / scaleY;

    this.gameLogicService.moveToPosition(mazeX, mazeY);
  }

  // 渲染游戏
  render(): void {
    if (!this.ctx) return;

    const canvas = this.canvasRef.nativeElement;
    const mazeWidth = this.gameLogicService.getMazeWidth();
    const mazeHeight = this.gameLogicService.getMazeHeight();
    const player = this.playerState();
    const levelConfig = this.levelConfig();

    // 计算缩放比例
    const scaleX = canvas.width / mazeWidth;
    const scaleY = canvas.height / mazeHeight;
    const scale = Math.min(scaleX, scaleY);

    // 保存上下文状态
    this.ctx.save();

    // 清除画布为黑色（迷雾效果）
    this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 应用缩放
    this.ctx.scale(scale, scale);

    // 检查是否有游戏数据
    if (levelConfig && mazeWidth > 0 && mazeHeight > 0) {
      // 保存状态，准备使用clip
      this.ctx.save();
      
      // 创建剪贴路径（光照区域）- 只在这个区域内绘制
      this.ctx.beginPath();
      this.ctx.arc(
        player.x,
        player.y,
        levelConfig.lightRadius,
        0,
        Math.PI * 2
      );
      this.ctx.clip();

      // 在光照区域内绘制所有游戏元素
      // 绘制迷宫背景
      this.drawMazeBackground();

      // 绘制迷宫墙壁
      this.drawMazeWalls();

      // 绘制节点
      this.drawNodes();

      // 绘制出口
      this.drawExit();

      // 绘制玩家
      this.drawPlayer();

      // 恢复状态（移除clip）
      this.ctx.restore();

      // 绘制光照边缘的柔和过渡效果
      this.drawLightEdge(player, levelConfig.lightRadius, mazeWidth, mazeHeight);
    }

    // 恢复上下文状态
    this.ctx.restore();
  }

  // 绘制光照边缘的柔和过渡
  private drawLightEdge(
    player: PlayerState,
    lightRadius: number,
    mazeWidth: number,
    mazeHeight: number
  ): void {
    // 保存状态
    this.ctx.save();

    // 使用 'source-over' 复合操作，在现有内容上绘制
    this.ctx.globalCompositeOperation = 'source-over';

    // 创建径向渐变，只在光照边缘绘制半透明黑色
    // 内部：透明（保持已绘制的内容可见）
    // 外部：黑色（与背景融合）
    const edgeGradient = this.ctx.createRadialGradient(
      player.x,
      player.y,
      lightRadius * 0.7,
      player.x,
      player.y,
      lightRadius
    );

    edgeGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');  // 完全透明
    edgeGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');  // 完全不透明（黑色）

    // 绘制渐变遮罩
    this.ctx.fillStyle = edgeGradient;
    this.ctx.fillRect(0, 0, mazeWidth, mazeHeight);

    // 恢复状态
    this.ctx.restore();
  }

  // 绘制迷宫背景
  private drawMazeBackground(): void {
    const mazeGrid = this.mazeGrid();
    if (mazeGrid.length === 0) return;

    const rows = mazeGrid.length;
    const cols = mazeGrid[0].length;

    this.ctx.fillStyle = GAME_CONFIG.COLORS.LIGHT;
    this.ctx.globalAlpha = 0.02;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * GAME_CONFIG.CELL_SIZE;
        const y = row * GAME_CONFIG.CELL_SIZE;

        this.ctx.fillRect(
          x + 1,
          y + 1,
          GAME_CONFIG.CELL_SIZE - 2,
          GAME_CONFIG.CELL_SIZE - 2
        );
      }
    }

    this.ctx.globalAlpha = 1;
  }

  // 绘制迷宫墙壁
  private drawMazeWalls(): void {
    const mazeGrid = this.mazeGrid();
    if (mazeGrid.length === 0) return;

    this.ctx.strokeStyle = GAME_CONFIG.COLORS.WALL;
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    for (let row = 0; row < mazeGrid.length; row++) {
      for (let col = 0; col < mazeGrid[row].length; col++) {
        const cell = mazeGrid[row][col];
        const x = col * GAME_CONFIG.CELL_SIZE;
        const y = row * GAME_CONFIG.CELL_SIZE;

        this.ctx.beginPath();

        // 上墙
        if (cell.walls.top) {
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x + GAME_CONFIG.CELL_SIZE, y);
        }

        // 下墙
        if (cell.walls.bottom) {
          this.ctx.moveTo(x, y + GAME_CONFIG.CELL_SIZE);
          this.ctx.lineTo(x + GAME_CONFIG.CELL_SIZE, y + GAME_CONFIG.CELL_SIZE);
        }

        // 左墙
        if (cell.walls.left) {
          this.ctx.moveTo(x, y);
          this.ctx.lineTo(x, y + GAME_CONFIG.CELL_SIZE);
        }

        // 右墙
        if (cell.walls.right) {
          this.ctx.moveTo(x + GAME_CONFIG.CELL_SIZE, y);
          this.ctx.lineTo(x + GAME_CONFIG.CELL_SIZE, y + GAME_CONFIG.CELL_SIZE);
        }

        this.ctx.stroke();
      }
    }
  }

  // 绘制节点
  private drawNodes(): void {
    const nodes = this.gameNodes();
    const levelConfig = this.levelConfig();
    const playerState = this.playerState();

    if (!levelConfig) return;

    nodes.forEach((node) => {
      const pos = GameUtils.gridToPixel(node.row, node.col);
      
      // 检查节点是否在光照范围内
      const distanceFromPlayer = GameUtils.distance(
        { x: playerState.x, y: playerState.y },
        pos
      );

      if (distanceFromPlayer > levelConfig.lightRadius) {
        return; // 不在光照范围内，不绘制
      }

      // 绘制节点光晕
      const gradient = this.ctx.createRadialGradient(
        pos.x,
        pos.y,
        0,
        pos.x,
        pos.y,
        GAME_CONFIG.NODE_RADIUS * 2
      );

      if (node.activated) {
        gradient.addColorStop(0, GAME_CONFIG.COLORS.NODE_ACTIVATED);
        gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      } else {
        gradient.addColorStop(0, GAME_CONFIG.COLORS.NODE);
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)');
      }

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, GAME_CONFIG.NODE_RADIUS * 2, 0, Math.PI * 2);
      this.ctx.fill();

      // 绘制节点核心
      this.ctx.fillStyle = node.activated
        ? GAME_CONFIG.COLORS.NODE_ACTIVATED
        : GAME_CONFIG.COLORS.NODE;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, GAME_CONFIG.NODE_RADIUS, 0, Math.PI * 2);
      this.ctx.fill();

      // 为顺序节点绘制顺序数字
      if (node.type === 'sequence' && node.sequenceOrder !== undefined && !node.activated) {
        this.ctx.fillStyle = GAME_CONFIG.COLORS.BACKGROUND;
        this.ctx.font = 'bold 12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(node.sequenceOrder.toString(), pos.x, pos.y);
      }
    });
  }

  // 绘制出口
  private drawExit(): void {
    const exit = this.exitState();
    const levelConfig = this.levelConfig();
    const playerState = this.playerState();

    if (!exit || !levelConfig) return;

    const pos = GameUtils.gridToPixel(exit.row, exit.col);

    // 检查出口是否在光照范围内
    const distanceFromPlayer = GameUtils.distance(
      { x: playerState.x, y: playerState.y },
      pos
    );

    if (distanceFromPlayer > levelConfig.lightRadius) {
      return; // 不在光照范围内，不绘制
    }

    // 绘制出口光晕
    const gradient = this.ctx.createRadialGradient(
      pos.x,
      pos.y,
      0,
      pos.x,
      pos.y,
      GAME_CONFIG.EXIT_RADIUS * 2.5
    );

    if (exit.unlocked) {
      gradient.addColorStop(0, GAME_CONFIG.COLORS.EXIT_UNLOCKED);
      gradient.addColorStop(1, 'rgba(255, 0, 255, 0)');
    } else {
      gradient.addColorStop(0, GAME_CONFIG.COLORS.EXIT_LOCKED);
      gradient.addColorStop(1, 'rgba(102, 102, 102, 0)');
    }

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, GAME_CONFIG.EXIT_RADIUS * 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    // 绘制出口核心
    this.ctx.strokeStyle = exit.unlocked
      ? GAME_CONFIG.COLORS.EXIT_UNLOCKED
      : GAME_CONFIG.COLORS.EXIT_LOCKED;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.arc(pos.x, pos.y, GAME_CONFIG.EXIT_RADIUS, 0, Math.PI * 2);
    this.ctx.stroke();

    // 绘制内圈
    if (exit.unlocked) {
      this.ctx.fillStyle = GAME_CONFIG.COLORS.EXIT_UNLOCKED;
      this.ctx.globalAlpha = 0.3;
      this.ctx.beginPath();
      this.ctx.arc(pos.x, pos.y, GAME_CONFIG.EXIT_RADIUS - 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
  }

  // 绘制玩家
  private drawPlayer(): void {
    const player = this.playerState();

    // 绘制玩家光晕
    const gradient = this.ctx.createRadialGradient(
      player.x,
      player.y,
      0,
      player.x,
      player.y,
      GAME_CONFIG.PLAYER_RADIUS * 3
    );

    gradient.addColorStop(0, GAME_CONFIG.COLORS.PLAYER);
    gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, GAME_CONFIG.PLAYER_RADIUS * 3, 0, Math.PI * 2);
    this.ctx.fill();

    // 绘制玩家核心
    this.ctx.fillStyle = GAME_CONFIG.COLORS.PLAYER;
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, GAME_CONFIG.PLAYER_RADIUS, 0, Math.PI * 2);
    this.ctx.fill();

    // 绘制玩家内圈
    this.ctx.fillStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.arc(player.x, player.y, GAME_CONFIG.PLAYER_RADIUS / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }
}
