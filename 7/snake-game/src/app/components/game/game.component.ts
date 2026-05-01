import { Component, OnInit, HostListener, OnDestroy, ViewChild, ElementRef, NgZone } from '@angular/core';

interface Position {
  x: number;
  y: number;
}

type Direction = 'up' | 'down' | 'left' | 'right';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  GRID_SIZE = 30;
  CELL_SIZE = 18;

  @ViewChild('gameCanvas') gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  snake: Position[] = [];
  food: Position = { x: 0, y: 0 };
  direction: Direction = 'right';
  nextDirection: Direction = 'right';
  score = 0;
  highScore = 0;
  gameOver = false;
  gameStarted = false;
  speed = 150;

  private animationFrameId: number | null = null;
  private lastMoveTime = 0;
  private directionQueue: Direction[] = [];

  get canvasWidth(): number {
    return this.GRID_SIZE * this.CELL_SIZE;
  }

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      this.highScore = parseInt(savedHighScore, 10);
    }
    this.initGame();
  }

  ngAfterViewInit(): void {
    const canvas = this.gameCanvas.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.render();
  }

  ngOnDestroy(): void {
    this.stopGameLoop();
  }

  initGame(): void {
    const center = Math.floor(this.GRID_SIZE / 2);
    this.snake = [
      { x: center, y: center },
      { x: center - 1, y: center },
      { x: center - 2, y: center }
    ];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.directionQueue = [];
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
    this.lastMoveTime = 0;
    this.spawnFood();
    this.stopGameLoop();

    if (this.ctx) {
      this.render();
    }
  }

  startGame(): void {
    if (this.gameStarted) return;
    this.gameStarted = true;
    this.gameOver = false;
    this.startGameLoop();
  }

  private startGameLoop(): void {
    this.stopGameLoop();
    this.ngZone.runOutsideAngular(() => {
      this.lastMoveTime = performance.now();
      this.gameLoop();
    });
  }

  private stopGameLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private gameLoop = (): void => {
    const now = performance.now();
    const delta = now - this.lastMoveTime;

    if (delta >= this.speed) {
      this.processDirectionQueue();
      this.move();
      this.lastMoveTime = now - (delta % this.speed);
    }

    this.render();

    if (this.gameStarted && !this.gameOver) {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  };

  private processDirectionQueue(): void {
    if (this.directionQueue.length > 0) {
      const queuedDir = this.directionQueue.shift()!;
      if (this.canChangeDirection(queuedDir)) {
        this.nextDirection = queuedDir;
      }
    }
  }

  private canChangeDirection(newDir: Direction): boolean {
    const opposites: Record<Direction, Direction> = {
      up: 'down',
      down: 'up',
      left: 'right',
      right: 'left'
    };
    return opposites[this.direction] !== newDir;
  }

  spawnFood(): void {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.GRID_SIZE),
        y: Math.floor(Math.random() * this.GRID_SIZE)
      };
    } while (this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    this.food = newFood;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (!this.gameStarted) {
      if (event.code === 'Space' || event.code.startsWith('Arrow')) {
        event.preventDefault();
        this.startGame();
        if (event.code.startsWith('Arrow')) {
          this.queueDirectionFromKey(event.code);
        }
        return;
      }
    }

    if (this.gameOver) {
      if (event.code === 'Space') {
        event.preventDefault();
        this.restart();
        return;
      }
    }

    if (event.code.startsWith('Arrow')) {
      event.preventDefault();
      this.queueDirectionFromKey(event.code);
    }
  }

  private queueDirectionFromKey(code: string): void {
    let dir: Direction | null = null;
    switch (code) {
      case 'ArrowUp':
        dir = 'up';
        break;
      case 'ArrowDown':
        dir = 'down';
        break;
      case 'ArrowLeft':
        dir = 'left';
        break;
      case 'ArrowRight':
        dir = 'right';
        break;
    }

    if (dir && this.canChangeDirection(dir)) {
      const lastQueued = this.directionQueue[this.directionQueue.length - 1];
      if (lastQueued !== dir) {
        this.directionQueue.push(dir);
      }
    }
  }

  move(): void {
    if (this.gameOver) return;

    this.direction = this.nextDirection;
    const head = { ...this.snake[0] };

    switch (this.direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    if (this.checkCollision(head)) {
      this.endGame();
      return;
    }

    this.snake.unshift(head);

    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('snakeHighScore', this.highScore.toString());
      }
      this.spawnFood();

      if (this.speed > 50 && this.score % 50 === 0) {
        this.speed -= 10;
      }
    } else {
      this.snake.pop();
    }
  }

  checkCollision(head: Position): boolean {
    if (head.x < 0 || head.x >= this.GRID_SIZE || head.y < 0 || head.y >= this.GRID_SIZE) {
      return true;
    }

    for (let i = 1; i < this.snake.length; i++) {
      if (this.snake[i].x === head.x && this.snake[i].y === head.y) {
        return true;
      }
    }

    return false;
  }

  private render(): void {
    if (!this.ctx) return;

    const { ctx, GRID_SIZE, CELL_SIZE } = this;
    const width = GRID_SIZE * CELL_SIZE;

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, width, width);

    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, width);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(width, i * CELL_SIZE);
      ctx.stroke();
    }

    this.snake.forEach((segment, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? '#22c55e' : '#16a34a';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );

      if (isHead) {
        ctx.fillStyle = '#000';
        const eyeSize = 3;
        const eyeOffset = 5;
        const center = CELL_SIZE / 2;

        switch (this.direction) {
          case 'up':
            ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
            ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
            break;
          case 'down':
            ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            break;
          case 'left':
            ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
            ctx.fillRect(segment.x * CELL_SIZE + eyeOffset, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            break;
          case 'right':
            ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + eyeOffset, eyeSize, eyeSize);
            ctx.fillRect(segment.x * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, segment.y * CELL_SIZE + CELL_SIZE - eyeOffset - eyeSize, eyeSize, eyeSize);
            break;
        }
      }
    });

    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(
      this.food.x * CELL_SIZE + CELL_SIZE / 2,
      this.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  endGame(): void {
    this.gameOver = true;
    this.gameStarted = false;
    this.stopGameLoop();
  }

  restart(): void {
    this.speed = 150;
    this.initGame();
    this.startGame();
  }

  changeDirection(dir: Direction): void {
    if (!this.gameStarted) {
      this.startGame();
      if (this.canChangeDirection(dir)) {
        this.nextDirection = dir;
      }
      return;
    }

    if (this.gameOver) {
      this.restart();
      return;
    }

    if (this.canChangeDirection(dir)) {
      const lastQueued = this.directionQueue[this.directionQueue.length - 1];
      if (lastQueued !== dir) {
        this.directionQueue.push(dir);
      }
    }
  }
}
