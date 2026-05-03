import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Marble {
  id: number;
  name: string;
  color: string;
  lane: number;
  position: number;
  speed: number;
  baseSpeed: number;
  isPlayer: boolean;
  finished: boolean;
  finishTime: number;
}

interface Obstacle {
  lane: number;
  position: number;
  type: 'slow' | 'boost';
  active: boolean;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  gameState: 'menu' | 'playing' | 'finished' = 'menu';
  marbles: Marble[] = [];
  obstacles: Obstacle[] = [];
  private animationFrameId: number = 0;
  private lastTime: number = 0;
  private startTime: number = 0;
  elapsedTime: number = 0;
  readonly trackLength: number = 1000;
  readonly laneCount: number = 5;

  readonly marbleColors = [
    { name: 'Red', color: '#EF4444' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Green', color: '#22C55E' },
    { name: 'Yellow', color: '#EAB308' },
    { name: 'Purple', color: '#A855F7' },
    { name: 'Orange', color: '#F97316' },
    { name: 'Cyan', color: '#06B6D4' },
    { name: 'Pink', color: '#EC4899' }
  ];

  readonly marbleNames = [
    'Speedy', 'Bolt', 'Flash', 'Zoom', 'Dash',
    'Rocket', 'Thunder', 'Blaze'
  ];

  ngOnInit(): void {
    this.initializeGame();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  initializeGame(): void {
    this.marbles = [];
    this.obstacles = [];
    
    this.marbles.push({
      id: 0,
      name: 'You',
      color: '#EF4444',
      lane: 2,
      position: 0,
      speed: 3,
      baseSpeed: 3,
      isPlayer: true,
      finished: false,
      finishTime: 0
    });

    for (let i = 1; i < 5; i++) {
      const colorIndex = (i - 1) % this.marbleColors.length;
      this.marbles.push({
        id: i,
        name: this.marbleNames[i - 1],
        color: this.marbleColors[colorIndex].color,
        lane: i % this.laneCount,
        position: 0,
        speed: 2 + Math.random() * 2,
        baseSpeed: 2 + Math.random() * 2,
        isPlayer: false,
        finished: false,
        finishTime: 0
      });
    }

    this.generateObstacles();
    this.elapsedTime = 0;
  }

  generateObstacles(): void {
    const obstacleCount = 15;
    for (let i = 0; i < obstacleCount; i++) {
      this.obstacles.push({
        lane: Math.floor(Math.random() * this.laneCount),
        position: 100 + Math.random() * (this.trackLength - 200),
        type: Math.random() > 0.6 ? 'boost' : 'slow',
        active: true
      });
    }
  }

  startGame(): void {
    this.initializeGame();
    this.gameState = 'playing';
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.gameLoop();
  }

  private gameLoop = (): void => {
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.elapsedTime = (currentTime - this.startTime) / 1000;
    this.lastTime = currentTime;

    this.updateMarbles(deltaTime);
    this.checkCollisions();
    this.checkFinished();

    if (this.gameState === 'playing') {
      this.animationFrameId = requestAnimationFrame(this.gameLoop);
    }
  };

  private updateMarbles(deltaTime: number): void {
    this.marbles.forEach(marble => {
      if (marble.finished) return;

      if (!marble.isPlayer) {
        if (Math.random() < 0.02) {
          marble.speed = marble.baseSpeed + (Math.random() - 0.5) * 0.5;
        }
        if (Math.random() < 0.01) {
          const newLane = marble.lane + (Math.random() > 0.5 ? 1 : -1);
          if (newLane >= 0 && newLane < this.laneCount) {
            marble.lane = newLane;
          }
        }
      }

      marble.position += marble.speed * deltaTime * 50;

      if (marble.position >= this.trackLength) {
        marble.position = this.trackLength;
        marble.finished = true;
        marble.finishTime = this.elapsedTime;
      }
    });
  }

  private checkCollisions(): void {
    this.marbles.forEach(marble => {
      if (marble.finished) return;

      this.obstacles.forEach(obstacle => {
        if (!obstacle.active) return;

        if (marble.lane === obstacle.lane &&
            Math.abs(marble.position - obstacle.position) < 20) {
          
          if (obstacle.type === 'boost') {
            marble.speed = marble.baseSpeed * 2;
            setTimeout(() => {
              marble.speed = marble.baseSpeed;
            }, 1000);
          } else {
            marble.speed = marble.baseSpeed * 0.3;
            setTimeout(() => {
              marble.speed = marble.baseSpeed;
            }, 800);
          }
          
          obstacle.active = false;
        }
      });
    });
  }

  private checkFinished(): void {
    const allFinished = this.marbles.every(m => m.finished);
    if (allFinished) {
      this.gameState = 'finished';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.gameState !== 'playing') return;

    const player = this.marbles.find(m => m.isPlayer);
    if (!player || player.finished) return;

    switch (event.key) {
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (player.lane > 0) {
          player.lane--;
        }
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (player.lane < this.laneCount - 1) {
          player.lane++;
        }
        break;
      case 'ArrowUp':
      case 'w':
      case 'W':
        player.speed = player.baseSpeed * 1.5;
        break;
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent): void {
    if (this.gameState !== 'playing') return;

    const player = this.marbles.find(m => m.isPlayer);
    if (!player) return;

    if (event.key === 'ArrowUp' || event.key === 'w' || event.key === 'W') {
      player.speed = player.baseSpeed;
    }
  }

  getRankedMarbles(): Marble[] {
    return [...this.marbles].sort((a, b) => {
      if (a.finished && b.finished) {
        return a.finishTime - b.finishTime;
      }
      if (a.finished) return -1;
      if (b.finished) return 1;
      return b.position - a.position;
    });
  }

  getPlayerRank(): number {
    const ranked = this.getRankedMarbles();
    return ranked.findIndex(m => m.isPlayer) + 1;
  }

  getProgress(marble: Marble): number {
    return (marble.position / this.trackLength) * 100;
  }

  formatTime(time: number): string {
    return time.toFixed(2) + 's';
  }

  darkenColor(color: string): string {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.substr(0, 2), 16) - 50);
    const g = Math.max(0, parseInt(hex.substr(2, 2), 16) - 50);
    const b = Math.max(0, parseInt(hex.substr(4, 2), 16) - 50);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}
