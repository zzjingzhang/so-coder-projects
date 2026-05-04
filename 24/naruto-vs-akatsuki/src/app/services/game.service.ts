import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { Ninja, NINJA_TYPES } from '../models/ninja';
import { Enemy, ENEMY_TYPES } from '../models/enemy';
import { Projectile } from '../models/projectile';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private readonly GRID_ROWS = 5;
  private readonly GRID_COLS = 9;
  private readonly INITIAL_CHAKRA = 100;
  private readonly CHAKRA_REGEN_RATE = 25;
  private readonly CHAKRA_REGEN_INTERVAL = 5000;

  private chakraSubject = new BehaviorSubject<number>(this.INITIAL_CHAKRA);
  private ninjasSubject = new BehaviorSubject<Ninja[]>([]);
  private enemiesSubject = new BehaviorSubject<Enemy[]>([]);
  private projectilesSubject = new BehaviorSubject<Projectile[]>([]);
  private scoreSubject = new BehaviorSubject<number>(0);
  private waveSubject = new BehaviorSubject<number>(1);
  private isGameOverSubject = new BehaviorSubject<boolean>(false);
  private isVictorySubject = new BehaviorSubject<boolean>(false);
  private isPausedSubject = new BehaviorSubject<boolean>(false);

  private gameLoopSubscription?: Subscription;
  private chakraRegenSubscription?: Subscription;
  private enemySpawnSubscription?: Subscription;

  private selectedNinjaType: typeof NINJA_TYPES[0] | null = null;
  private enemiesKilled: number = 0;
  private enemiesToSpawn: number = 10;
  private enemiesSpawned: number = 0;

  chakra$ = this.chakraSubject.asObservable();
  ninjas$ = this.ninjasSubject.asObservable();
  enemies$ = this.enemiesSubject.asObservable();
  projectiles$ = this.projectilesSubject.asObservable();
  score$ = this.scoreSubject.asObservable();
  wave$ = this.waveSubject.asObservable();
  isGameOver$ = this.isGameOverSubject.asObservable();
  isVictory$ = this.isVictorySubject.asObservable();
  isPaused$ = this.isPausedSubject.asObservable();

  constructor() { }

  getGridRows(): number {
    return this.GRID_ROWS;
  }

  getGridCols(): number {
    return this.GRID_COLS;
  }

  getNinjaTypes(): typeof NINJA_TYPES {
    return NINJA_TYPES;
  }

  selectNinja(ninjaType: typeof NINJA_TYPES[0]): void {
    this.selectedNinjaType = ninjaType;
  }

  getSelectedNinja(): typeof NINJA_TYPES[0] | null {
    return this.selectedNinjaType;
  }

  clearSelection(): void {
    this.selectedNinjaType = null;
  }

  canPlaceNinja(row: number, col: number): boolean {
    if (!this.selectedNinjaType) return false;
    if (this.chakraSubject.value < this.selectedNinjaType.cost) return false;
    
    const ninjas = this.ninjasSubject.value;
    const hasNinja = ninjas.some(n => n.row === row && n.col === col);
    
    return !hasNinja;
  }

  placeNinja(row: number, col: number): boolean {
    if (!this.canPlaceNinja(row, col)) return false;
    if (!this.selectedNinjaType) return false;

    const ninja: Ninja = {
      id: `ninja-${Date.now()}-${Math.random()}`,
      name: this.selectedNinjaType.name,
      emoji: this.selectedNinjaType.emoji,
      cost: this.selectedNinjaType.cost,
      health: this.selectedNinjaType.health,
      maxHealth: this.selectedNinjaType.maxHealth,
      damage: this.selectedNinjaType.damage,
      attackSpeed: this.selectedNinjaType.attackSpeed,
      range: this.selectedNinjaType.range,
      specialAbility: this.selectedNinjaType.specialAbility,
      color: this.selectedNinjaType.color,
      row: row,
      col: col,
      isAttacking: false,
      lastAttackTime: 0
    };

    const ninjas = [...this.ninjasSubject.value, ninja];
    this.ninjasSubject.next(ninjas);

    const newChakra = this.chakraSubject.value - this.selectedNinjaType.cost;
    this.chakraSubject.next(newChakra);

    return true;
  }

  startGame(): void {
    this.resetGame();
    this.isGameOverSubject.next(false);
    this.isVictorySubject.next(false);
    this.isPausedSubject.next(false);
    
    this.startGameLoop();
    this.startChakraRegen();
    this.startEnemySpawn();
  }

  resetGame(): void {
    this.chakraSubject.next(this.INITIAL_CHAKRA);
    this.ninjasSubject.next([]);
    this.enemiesSubject.next([]);
    this.projectilesSubject.next([]);
    this.scoreSubject.next(0);
    this.waveSubject.next(1);
    this.enemiesKilled = 0;
    this.enemiesToSpawn = 10;
    this.enemiesSpawned = 0;
    this.selectedNinjaType = null;
    
    this.stopAllSubscriptions();
  }

  pauseGame(): void {
    this.isPausedSubject.next(true);
  }

  resumeGame(): void {
    this.isPausedSubject.next(false);
  }

  private stopAllSubscriptions(): void {
    if (this.gameLoopSubscription) {
      this.gameLoopSubscription.unsubscribe();
      this.gameLoopSubscription = undefined;
    }
    if (this.chakraRegenSubscription) {
      this.chakraRegenSubscription.unsubscribe();
      this.chakraRegenSubscription = undefined;
    }
    if (this.enemySpawnSubscription) {
      this.enemySpawnSubscription.unsubscribe();
      this.enemySpawnSubscription = undefined;
    }
  }

  private startGameLoop(): void {
    this.gameLoopSubscription = interval(50).subscribe(() => {
      if (this.isPausedSubject.value || this.isGameOverSubject.value) return;
      this.updateGame();
    });
  }

  private startChakraRegen(): void {
    this.chakraRegenSubscription = interval(this.CHAKRA_REGEN_INTERVAL).subscribe(() => {
      if (this.isPausedSubject.value || this.isGameOverSubject.value) return;
      
      let chakraFromNinjas = 0;
      const ninjas = this.ninjasSubject.value;
      
      ninjas.forEach(ninja => {
        if (ninja.name === '九尾') {
          chakraFromNinjas += 25;
        }
      });

      const newChakra = Math.min(9999, this.chakraSubject.value + this.CHAKRA_REGEN_RATE + chakraFromNinjas);
      this.chakraSubject.next(newChakra);
    });
  }

  private startEnemySpawn(): void {
    const spawnInterval = Math.max(2000, 5000 - (this.waveSubject.value - 1) * 500);
    
    this.enemySpawnSubscription = interval(spawnInterval).subscribe(() => {
      if (this.isPausedSubject.value || this.isGameOverSubject.value) return;
      
      if (this.enemiesSpawned < this.enemiesToSpawn) {
        this.spawnEnemy();
        this.enemiesSpawned++;
      }
    });
  }

  private spawnEnemy(): void {
    const row = Math.floor(Math.random() * this.GRID_ROWS);
    const wave = this.waveSubject.value;
    
    let enemyTypeIndex = 0;
    if (wave >= 2 && Math.random() < 0.3) {
      enemyTypeIndex = 1;
    }
    if (wave >= 3 && Math.random() < 0.2) {
      enemyTypeIndex = 2;
    }

    const enemyType = ENEMY_TYPES[enemyTypeIndex];
    
    const enemy: Enemy = {
      id: `enemy-${Date.now()}-${Math.random()}`,
      name: enemyType.name,
      emoji: enemyType.emoji,
      health: enemyType.health + (wave - 1) * 20,
      maxHealth: enemyType.maxHealth + (wave - 1) * 20,
      damage: enemyType.damage + (wave - 1) * 5,
      speed: enemyType.speed,
      row: row,
      col: this.GRID_COLS,
      color: enemyType.color,
      isMoving: true
    };

    const enemies = [...this.enemiesSubject.value, enemy];
    this.enemiesSubject.next(enemies);
  }

  private updateGame(): void {
    this.updateEnemies();
    this.updateNinjas();
    this.updateProjectiles();
    this.checkGameOver();
    this.checkWaveComplete();
  }

  private updateEnemies(): void {
    const enemies = [...this.enemiesSubject.value];
    const ninjas = [...this.ninjasSubject.value];
    let enemiesToRemove: string[] = [];
    let ninjasToRemove: string[] = [];

    enemies.forEach(enemy => {
      if (enemy.isMoving) {
        const blockingNinja = ninjas.find(n => 
          n.row === enemy.row && 
          Math.abs(n.col! - enemy.col) < 0.8
        );

        if (blockingNinja) {
          enemy.isEating = true;
          enemy.isMoving = false;
          enemy.targetNinja = blockingNinja.id;
          
          blockingNinja.health -= enemy.damage * 0.05;
          
          if (blockingNinja.health <= 0) {
            ninjasToRemove.push(blockingNinja.id);
            enemy.isEating = false;
            enemy.isMoving = true;
            enemy.targetNinja = undefined;
          }
        } else {
          enemy.col -= enemy.speed * 0.05;
        }
      }
    });

    const filteredEnemies = enemies.filter(e => !enemiesToRemove.includes(e.id));
    const filteredNinjas = ninjas.filter(n => !ninjasToRemove.includes(n.id));

    this.enemiesSubject.next(filteredEnemies);
    this.ninjasSubject.next(filteredNinjas);
  }

  private updateNinjas(): void {
    const now = Date.now();
    const ninjas = [...this.ninjasSubject.value];
    const enemies = [...this.enemiesSubject.value];

    ninjas.forEach(ninja => {
      if (ninja.name === '九尾' || ninja.name === '小樱') {
        return;
      }

      if (!ninja.lastAttackTime || now - ninja.lastAttackTime >= ninja.attackSpeed) {
        const enemyInRow = enemies.find(e => 
          e.row === ninja.row && 
          e.col > ninja.col! &&
          e.col - ninja.col! <= ninja.range
        );

        if (enemyInRow) {
          ninja.lastAttackTime = now;
          ninja.isAttacking = true;

          setTimeout(() => {
            const currentNinjas = this.ninjasSubject.value;
            const n = currentNinjas.find(cn => cn.id === ninja.id);
            if (n) {
              n.isAttacking = false;
              this.ninjasSubject.next([...currentNinjas]);
            }
          }, 200);

          this.createProjectile(ninja);
        }
      }
    });

    this.ninjasSubject.next(ninjas);
  }

  private createProjectile(ninja: Ninja): void {
    const projectileEmojis: { [key: string]: string } = {
      '鸣人': '🌀',
      '佐助': '🔥',
      '卡卡西': '⚡',
      '小樱': '💖'
    };

    const projectile: Projectile = {
      id: `proj-${Date.now()}-${Math.random()}`,
      row: ninja.row!,
      col: ninja.col! + 0.5,
      damage: ninja.damage,
      speed: 0.3,
      emoji: projectileEmojis[ninja.name] || '💫',
      ownerId: ninja.id
    };

    const projectiles = [...this.projectilesSubject.value, projectile];
    this.projectilesSubject.next(projectiles);
  }

  private updateProjectiles(): void {
    const projectiles = [...this.projectilesSubject.value];
    const enemies = [...this.enemiesSubject.value];
    let projectilesToRemove: string[] = [];
    let enemiesToRemove: string[] = [];
    let scoreGain = 0;

    projectiles.forEach(proj => {
      proj.col += proj.speed;

      if (proj.col >= this.GRID_COLS) {
        projectilesToRemove.push(proj.id);
        return;
      }

      const hitEnemy = enemies.find(e => 
        e.row === proj.row && 
        Math.abs(e.col - proj.col) < 0.5 &&
        !enemiesToRemove.includes(e.id)
      );

      if (hitEnemy) {
        hitEnemy.health -= proj.damage;
        projectilesToRemove.push(proj.id);

        if (hitEnemy.health <= 0) {
          enemiesToRemove.push(hitEnemy.id);
          this.enemiesKilled++;
          
          if (hitEnemy.name === '晓成员') scoreGain += 10;
          else if (hitEnemy.name === '佩恩') scoreGain += 30;
          else if (hitEnemy.name === '大蛇丸') scoreGain += 20;
        }
      }
    });

    const filteredProjectiles = projectiles.filter(p => !projectilesToRemove.includes(p.id));
    const filteredEnemies = enemies.filter(e => !enemiesToRemove.includes(e.id));

    this.projectilesSubject.next(filteredProjectiles);
    this.enemiesSubject.next(filteredEnemies);

    if (scoreGain > 0) {
      const newScore = this.scoreSubject.value + scoreGain;
      this.scoreSubject.next(newScore);
    }
  }

  private checkGameOver(): void {
    const enemies = this.enemiesSubject.value;
    
    const enemyReachedLeft = enemies.some(e => e.col <= 0);
    
    if (enemyReachedLeft) {
      this.isGameOverSubject.next(true);
      this.isVictorySubject.next(false);
      this.stopAllSubscriptions();
    }
  }

  private checkWaveComplete(): void {
    const enemies = this.enemiesSubject.value;
    
    if (this.enemiesSpawned >= this.enemiesToSpawn && enemies.length === 0 && this.enemiesKilled > 0) {
      const currentWave = this.waveSubject.value;
      
      if (currentWave >= 5) {
        this.isGameOverSubject.next(true);
        this.isVictorySubject.next(true);
        this.stopAllSubscriptions();
      } else {
        const newWave = currentWave + 1;
        this.waveSubject.next(newWave);
        this.enemiesSpawned = 0;
        this.enemiesToSpawn = 10 + (newWave - 1) * 5;
        this.enemiesKilled = 0;

        if (this.enemySpawnSubscription) {
          this.enemySpawnSubscription.unsubscribe();
        }
        this.startEnemySpawn();
      }
    }
  }
}
