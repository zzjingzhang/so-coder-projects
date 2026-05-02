import { Component, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GameService, GameState, Car, Obstacle, RoadLine } from '../../services/game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, NzButtonModule, NzIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnDestroy, AfterViewInit {
  gameState: GameState | null = null;
  playerCar: Car | null = null;
  obstacles: Obstacle[] = [];
  roadLines: RoadLine[] = [];
  
  private subscriptions: Subscription[] = [];
  canvasWidth = 320;
  canvasHeight = 500;
  
  constructor(
    private gameService: GameService,
    private router: Router,
    private modalService: NzModalService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.gameService.gameState$.subscribe(state => {
        this.gameState = state;
        if (state.isGameOver) {
          this.showGameOverModal();
        }
      }),
      this.gameService.playerCar$.subscribe(car => {
        this.playerCar = car;
      }),
      this.gameService.obstacles$.subscribe(obs => {
        this.obstacles = [...obs];
      }),
      this.gameService.roadLines$.subscribe(lines => {
        this.roadLines = [...lines];
      })
    );
  }

  ngAfterViewInit(): void {
    this.updateCanvasSize();
    this.gameService.startGame();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.gameService.resetGame();
  }

  private updateCanvasSize(): void {
    const maxWidth = Math.min(window.innerWidth - 32, 400);
    const maxHeight = Math.min(window.innerHeight - 200, 600);
    
    this.canvasWidth = maxWidth;
    this.canvasHeight = maxHeight;
    
    this.gameService.setCanvasDimensions(this.canvasWidth, this.canvasHeight);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateCanvasSize();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.moveLeft();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.moveRight();
    } else if (event.key === ' ' || event.key === 'Escape') {
      event.preventDefault();
      this.togglePause();
    }
  }

  moveLeft(): void {
    this.gameService.movePlayerCar('left');
  }

  moveRight(): void {
    this.gameService.movePlayerCar('right');
  }

  togglePause(): void {
    this.gameService.togglePause();
  }

  goHome(): void {
    this.gameService.resetGame();
    this.router.navigate(['/']);
  }

  private showGameOverModal(): void {
    this.modalService.confirm({
      nzTitle: '游戏结束',
      nzContent: `
        <div class="text-center py-4">
          <div class="text-5xl mb-4">💥</div>
          <p class="text-xl mb-2">最终得分</p>
          <p class="text-4xl font-bold text-red-500 mb-4">${this.gameState?.score}</p>
          <p class="text-gray-500">最高分: ${this.gameState?.highScore}</p>
        </div>
      `,
      nzOkText: '重新开始',
      nzCancelText: '返回首页',
      nzOnOk: () => {
        this.gameService.startGame();
      },
      nzOnCancel: () => {
        this.goHome();
      }
    });
  }

  getLaneWidth(): number {
    return this.gameService.getLaneWidth();
  }
}
