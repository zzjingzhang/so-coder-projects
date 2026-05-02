import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  lane: number;
  color: string;
}

export interface Obstacle extends Car {
  speed: number;
}

export interface GameState {
  score: number;
  highScore: number;
  lives: number;
  level: number;
  isPlaying: boolean;
  isPaused: boolean;
  isGameOver: boolean;
  speed: number;
}

export interface RoadLine {
  y: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly ROAD_LANES = 3;
  private readonly INITIAL_SPEED = 3;
  private readonly MAX_SPEED = 12;
  private readonly SPEED_INCREMENT = 0.5;
  
  private gameStateSubject = new BehaviorSubject<GameState>({
    score: 0,
    highScore: this.loadHighScore(),
    lives: 3,
    level: 1,
    isPlaying: false,
    isPaused: false,
    isGameOver: false,
    speed: this.INITIAL_SPEED
  });
  
  private playerCarSubject = new BehaviorSubject<Car>({
    x: 0,
    y: 0,
    width: 40,
    height: 70,
    lane: 1,
    color: '#e94560'
  });
  
  private obstaclesSubject = new BehaviorSubject<Obstacle[]>([]);
  private roadLinesSubject = new BehaviorSubject<RoadLine[]>([]);
  
  gameState$: Observable<GameState> = this.gameStateSubject.asObservable();
  playerCar$: Observable<Car> = this.playerCarSubject.asObservable();
  obstacles$: Observable<Obstacle[]> = this.obstaclesSubject.asObservable();
  roadLines$: Observable<RoadLine[]> = this.roadLinesSubject.asObservable();
  
  private canvasWidth = 400;
  private canvasHeight = 600;
  private animationId: number | null = null;
  private lastObstacleTime = 0;
  private roadLines: RoadLine[] = [];
  
  constructor(private ngZone: NgZone) {
    this.initializeRoadLines();
  }
  
  private initializeRoadLines(): void {
    this.roadLines = [];
    for (let i = 0; i < 10; i++) {
      this.roadLines.push({ y: i * 80 });
    }
    this.roadLinesSubject.next([...this.roadLines]);
  }
  
  getRoadLines(): RoadLine[] {
    return [...this.roadLines];
  }
  
  setCanvasDimensions(width: number, height: number): void {
    this.canvasWidth = width;
    this.canvasHeight = height;
    const laneWidth = this.canvasWidth / this.ROAD_LANES;
    const playerX = laneWidth * 1 + (laneWidth - this.playerCarSubject.value.width) / 2;
    const playerY = this.canvasHeight - this.playerCarSubject.value.height - 50;
    
    this.playerCarSubject.next({
      ...this.playerCarSubject.value,
      x: playerX,
      y: playerY
    });
  }
  
  private loadHighScore(): number {
    const saved = localStorage.getItem('racingGameHighScore');
    return saved ? parseInt(saved, 10) : 0;
  }
  
  private saveHighScore(score: number): void {
    localStorage.setItem('racingGameHighScore', score.toString());
  }
  
  getLaneWidth(): number {
    return this.canvasWidth / this.ROAD_LANES;
  }
  
  getCanvasWidth(): number {
    return this.canvasWidth;
  }
  
  getCanvasHeight(): number {
    return this.canvasHeight;
  }
  
  movePlayerCar(direction: 'left' | 'right'): void {
    const state = this.gameStateSubject.value;
    if (!state.isPlaying || state.isPaused || state.isGameOver) return;
    
    const player = this.playerCarSubject.value;
    const laneWidth = this.getLaneWidth();
    let newLane = player.lane;
    
    if (direction === 'left' && player.lane > 0) {
      newLane = player.lane - 1;
    } else if (direction === 'right' && player.lane < this.ROAD_LANES - 1) {
      newLane = player.lane + 1;
    }
    
    const newX = laneWidth * newLane + (laneWidth - player.width) / 2;
    
    this.playerCarSubject.next({
      ...player,
      x: newX,
      lane: newLane
    });
  }
  
  startGame(): void {
    this.initializeRoadLines();
    this.gameStateSubject.next({
      ...this.gameStateSubject.value,
      score: 0,
      lives: 3,
      level: 1,
      isPlaying: true,
      isPaused: false,
      isGameOver: false,
      speed: this.INITIAL_SPEED
    });
    
    this.obstaclesSubject.next([]);
    this.lastObstacleTime = 0;
    
    const laneWidth = this.getLaneWidth();
    const playerX = laneWidth * 1 + (laneWidth - this.playerCarSubject.value.width) / 2;
    const playerY = this.canvasHeight - this.playerCarSubject.value.height - 50;
    
    this.playerCarSubject.next({
      ...this.playerCarSubject.value,
      x: playerX,
      y: playerY,
      lane: 1
    });
    
    this.gameLoop();
  }
  
  togglePause(): void {
    const state = this.gameStateSubject.value;
    if (!state.isPlaying || state.isGameOver) return;
    
    this.gameStateSubject.next({
      ...state,
      isPaused: !state.isPaused
    });
    
    if (!state.isPaused) {
      this.gameLoop();
    }
  }
  
  private gameLoop(timestamp = 0): void {
    const state = this.gameStateSubject.value;
    
    if (!state.isPlaying || state.isPaused || state.isGameOver) {
      return;
    }
    
    this.ngZone.run(() => {
      this.updateRoadLines(state.speed);
      this.updateObstacles(timestamp, state.speed);
      this.checkCollisions();
      this.updateScore();
    });
    
    this.animationId = requestAnimationFrame((time) => this.gameLoop(time));
  }
  
  private updateRoadLines(speed: number): void {
    this.roadLines.forEach(line => {
      line.y += speed * 2;
      if (line.y > this.canvasHeight) {
        line.y = -80;
      }
    });
    this.roadLinesSubject.next([...this.roadLines]);
  }
  
  private updateObstacles(timestamp: number, speed: number): void {
    const obstacles = [...this.obstaclesSubject.value];
    
    obstacles.forEach(obs => {
      obs.y += obs.speed;
    });
    
    const filtered = obstacles.filter(obs => obs.y < this.canvasHeight + 100);
    
    const minInterval = Math.max(800, 2000 - speed * 100);
    if (timestamp - this.lastObstacleTime > minInterval) {
      this.lastObstacleTime = timestamp;
      const laneWidth = this.getLaneWidth();
      const lane = Math.floor(Math.random() * this.ROAD_LANES);
      const colors = ['#4a90d9', '#50c878', '#f39c12', '#9b59b6', '#1abc9c'];
      
      filtered.push({
        x: laneWidth * lane + (laneWidth - 40) / 2,
        y: -80,
        width: 40,
        height: 70,
        lane: lane,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: speed
      });
    }
    
    this.obstaclesSubject.next([...filtered]);
  }
  
  private checkCollisions(): void {
    const player = this.playerCarSubject.value;
    const obstacles = this.obstaclesSubject.value;
    
    for (const obs of obstacles) {
      if (this.isColliding(player, obs)) {
        this.handleCollision(obs);
        return;
      }
    }
  }
  
  private isColliding(a: Car, b: Car): boolean {
    const padding = 5;
    return (
      a.x + padding < b.x + b.width &&
      a.x + a.width - padding > b.x &&
      a.y + padding < b.y + b.height &&
      a.y + a.height - padding > b.y
    );
  }
  
  private handleCollision(obstacle: Obstacle): void {
    const state = this.gameStateSubject.value;
    const obstacles = this.obstaclesSubject.value;
    
    const filtered = obstacles.filter(obs => obs !== obstacle);
    this.obstaclesSubject.next([...filtered]);
    
    const newLives = state.lives - 1;
    
    if (newLives <= 0) {
      this.endGame();
    } else {
      this.gameStateSubject.next({
        ...state,
        lives: newLives
      });
    }
  }
  
  private updateScore(): void {
    const state = this.gameStateSubject.value;
    const newScore = state.score + 1;
    const newLevel = Math.floor(newScore / 500) + 1;
    const newSpeed = Math.min(this.MAX_SPEED, this.INITIAL_SPEED + (newLevel - 1) * this.SPEED_INCREMENT);
    
    this.gameStateSubject.next({
      ...state,
      score: newScore,
      level: newLevel,
      speed: newSpeed
    });
  }
  
  private endGame(): void {
    const state = this.gameStateSubject.value;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    const newHighScore = Math.max(state.highScore, state.score);
    this.saveHighScore(newHighScore);
    
    this.gameStateSubject.next({
      ...state,
      highScore: newHighScore,
      isPlaying: false,
      isGameOver: true
    });
  }
  
  resetGame(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    this.initializeRoadLines();
    this.gameStateSubject.next({
      score: 0,
      highScore: this.loadHighScore(),
      lives: 3,
      level: 1,
      isPlaying: false,
      isPaused: false,
      isGameOver: false,
      speed: this.INITIAL_SPEED
    });
    
    this.obstaclesSubject.next([]);
  }
}
