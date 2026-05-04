import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Ninja, NINJA_TYPES } from '../../models/ninja';
import { Enemy } from '../../models/enemy';
import { Projectile } from '../../models/projectile';
import { Subscription } from 'rxjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule, NzTooltipModule],
  templateUrl: './game.html',
  styleUrls: ['./game.css']
})
export class GameComponent implements OnInit, OnDestroy {
  gridRows: number = 0;
  gridCols: number = 0;
  ninjaTypes = NINJA_TYPES;
  
  chakra: number = 100;
  score: number = 0;
  wave: number = 1;
  ninjas: Ninja[] = [];
  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  selectedNinja: typeof NINJA_TYPES[0] | null = null;
  isPaused: boolean = false;
  isGameOver: boolean = false;
  isVictory: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gridRows = this.gameService.getGridRows();
    this.gridCols = this.gameService.getGridCols();
    
    this.gameService.startGame();
    this.setupSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.gameService.resetGame();
  }

  private setupSubscriptions(): void {
    this.subscriptions.push(
      this.gameService.chakra$.subscribe(chakra => {
        this.chakra = chakra;
      }),
      this.gameService.score$.subscribe(score => {
        this.score = score;
      }),
      this.gameService.wave$.subscribe(wave => {
        this.wave = wave;
      }),
      this.gameService.ninjas$.subscribe(ninjas => {
        this.ninjas = [...ninjas];
      }),
      this.gameService.enemies$.subscribe(enemies => {
        this.enemies = [...enemies];
      }),
      this.gameService.projectiles$.subscribe(projectiles => {
        this.projectiles = [...projectiles];
      }),
      this.gameService.isPaused$.subscribe(isPaused => {
        this.isPaused = isPaused;
      }),
      this.gameService.isGameOver$.subscribe(isGameOver => {
        this.isGameOver = isGameOver;
        if (isGameOver) {
          this.handleGameOver();
        }
      }),
      this.gameService.isVictory$.subscribe(isVictory => {
        this.isVictory = isVictory;
      })
    );
  }

  selectNinja(ninjaType: typeof NINJA_TYPES[0]): void {
    if (this.chakra >= ninjaType.cost) {
      this.selectedNinja = ninjaType;
      this.gameService.selectNinja(ninjaType);
    }
  }

  canPlaceNinja(row: number, col: number): boolean {
    return this.gameService.canPlaceNinja(row, col);
  }

  placeNinja(row: number, col: number): void {
    if (this.canPlaceNinja(row, col)) {
      this.gameService.placeNinja(row, col);
      this.selectedNinja = null;
      this.gameService.clearSelection();
    }
  }

  getNinjaAt(row: number, col: number): Ninja | undefined {
    return this.ninjas.find(n => n.row === row && n.col === col);
  }

  getEnemiesAt(row: number): Enemy[] {
    return this.enemies.filter(e => e.row === row);
  }

  getProjectilesAt(row: number): Projectile[] {
    return this.projectiles.filter(p => p.row === row);
  }

  getHealthPercentage(health: number, maxHealth: number): number {
    return (health / maxHealth) * 100;
  }

  getHealthColor(health: number, maxHealth: number): string {
    const percentage = this.getHealthPercentage(health, maxHealth);
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  }

  togglePause(): void {
    if (this.isPaused) {
      this.gameService.resumeGame();
    } else {
      this.gameService.pauseGame();
    }
  }

  private handleGameOver(): void {
    setTimeout(() => {
      this.router.navigate(['/game-over'], { 
        state: { 
          isVictory: this.isVictory,
          score: this.score,
          wave: this.wave
        }
      });
    }, 1500);
  }

  backToMenu(): void {
    this.router.navigate(['/menu']);
  }
}
