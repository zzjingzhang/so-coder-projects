import { Component, OnInit, OnDestroy } from '@angular/core';
import { RmbService, CoinState, GameTarget, GameLevel } from '../services/rmb.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  standalone: false
})
export class GameComponent implements OnInit, OnDestroy {
  gameLevels: GameLevel[] = [];
  selectedLevel = 0;
  gameStarted = false;
  gamePaused = false;
  currentTarget: GameTarget | null = null;
  currentState: CoinState = { yuan: 0, jiao: 0, fen: 0 };
  score = 0;
  round = 0;
  totalRounds = 10;
  timeLeft = 60;
  maxTime = 60;
  animationStates = {
    yuan: false,
    jiao: false,
    fen: false
  };
  showSuccess = false;
  showError = false;
  successMessage = '';
  errorMessage = '';
  private timerSubscription?: Subscription;
  private stateSubscription?: Subscription;

  constructor(private rmbService: RmbService) {}

  ngOnInit(): void {
    this.gameLevels = this.rmbService.getGameLevels();
    this.stateSubscription = this.rmbService.coinState$.subscribe(state => {
      this.currentState = state;
    });
  }

  startGame(): void {
    this.gameStarted = true;
    this.gamePaused = false;
    this.score = 0;
    this.round = 0;
    this.rmbService.reset();
    this.nextRound();
    this.startTimer();
  }

  private startTimer(): void {
    this.maxTime = this.gameLevels[this.selectedLevel].timeLimit;
    this.timeLeft = this.maxTime;
    
    this.timerSubscription?.unsubscribe();
    this.timerSubscription = interval(1000).subscribe(() => {
      if (!this.gamePaused && this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft === 0) {
          this.endGame();
        }
      }
    });
  }

  private nextRound(): void {
    if (this.round >= this.totalRounds) {
      this.endGame();
      return;
    }
    this.round++;
    this.currentTarget = this.rmbService.generateGameTarget(this.selectedLevel);
    this.rmbService.reset();
    this.hideMessages();
  }

  addCoin(unit: 'yuan' | 'jiao' | 'fen'): void {
    this.animationStates[unit] = true;
    this.rmbService.addCoin(unit);
    setTimeout(() => {
      this.animationStates[unit] = false;
    }, 500);
  }

  removeCoin(unit: 'yuan' | 'jiao' | 'fen'): void {
    this.rmbService.removeCoin(unit);
  }

  submitAnswer(): void {
    if (!this.currentTarget) return;

    if (this.rmbService.checkMatch(this.currentState, this.currentTarget)) {
      this.showSuccess = true;
      this.showError = false;
      this.score += Math.ceil((this.timeLeft / this.maxTime) * 100);
      this.successMessage = `太棒了！答对了！🎉 获得 ${Math.ceil((this.timeLeft / this.maxTime) * 100)} 分！`;
      
      setTimeout(() => {
        if (this.round < this.totalRounds) {
          this.nextRound();
        } else {
          this.endGame();
        }
      }, 2000);
    } else {
      this.showError = true;
      this.showSuccess = false;
      this.errorMessage = '再试一次！仔细看看目标金额是多少？💪';
      setTimeout(() => {
        this.hideMessages();
      }, 2000);
    }
  }

  private hideMessages(): void {
    this.showSuccess = false;
    this.showError = false;
  }

  skipRound(): void {
    if (this.round < this.totalRounds) {
      this.nextRound();
    } else {
      this.endGame();
    }
  }

  private endGame(): void {
    this.gameStarted = false;
    this.timerSubscription?.unsubscribe();
  }

  togglePause(): void {
    this.gamePaused = !this.gamePaused;
  }

  getTimePercentage(): number {
    return (this.timeLeft / this.maxTime) * 100;
  }

  getCoinsArray(count: number): number[] {
    return Array(Math.min(count, 10)).fill(0);
  }

  getLevelColor(level: GameLevel): string {
    switch (level.name) {
      case '初级': return 'bg-green-100 text-green-800';
      case '中级': return 'bg-yellow-100 text-yellow-800';
      case '高级': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getScoreGrade(): string {
    const percentage = (this.score / (this.totalRounds * 100)) * 100;
    if (percentage >= 90) return '🏆 优秀！';
    if (percentage >= 70) return '⭐ 良好！';
    if (percentage >= 50) return '💪 继续努力！';
    return '📚 需要多练习！';
  }

  getAccuracyPercentage(): number {
    return Math.round((this.score / (this.totalRounds * 100)) * 100);
  }

  ngOnDestroy(): void {
    this.timerSubscription?.unsubscribe();
    this.stateSubscription?.unsubscribe();
  }
}
