import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NumberCell {
  value: number;
  visible: boolean;
  correct: boolean | null;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="text-center py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">🎮 1-25 数学消消乐</h1>
          <p class="text-blue-100 text-base md:text-lg">按顺序点击 1 到 25，点错则全部重置！</p>
        </div>

        <div class="p-6">
          <div class="game-info flex flex-wrap justify-between items-center mb-8 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-blue-100">
            <div class="flex items-center gap-3 mb-2 md:mb-0">
              <span class="text-gray-600 font-semibold text-sm md:text-base">下一个数字:</span>
              <span class="text-2xl md:text-3xl font-bold text-blue-600 bg-blue-100 px-4 py-2 rounded-lg">{{ nextNumber }}</span>
            </div>
            <div class="flex items-center gap-3 mb-2 md:mb-0">
              <span class="text-gray-600 font-semibold text-sm md:text-base">⏱️ 用时:</span>
              <span class="text-xl md:text-2xl font-mono font-bold text-indigo-600 bg-indigo-100 px-4 py-2 rounded-lg">{{ formatTime(elapsedTime) }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-gray-600 font-semibold text-sm md:text-base">📊 进度:</span>
              <span class="text-xl md:text-2xl font-bold text-green-600 bg-green-100 px-4 py-2 rounded-lg">{{ eliminatedCount }} / 25</span>
            </div>
          </div>

          <div class="grid grid-cols-5 gap-3 md:gap-4 mb-8">
            @for (cell of cells; track cell.value) {
              <button
                [class]="getCellClass(cell)"
                (click)="onCellClick(cell)"
                [disabled]="gameCompleted || !cell.visible"
              >
                {{ cell.value }}
              </button>
            }
          </div>

          <div class="flex justify-center gap-4">
            <button
              class="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-lg rounded-xl shadow-lg hover:from-gray-600 hover:to-gray-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              (click)="resetGame()"
            >
              <span class="text-xl">🔄</span>
              重新开始
            </button>
          </div>
        </div>
      </div>

      @if (showCompletionDialog) {
        <div class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" (click)="onBackdropClick($event)">
          <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100" (click)="$event.stopPropagation()">
            <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-center">
              <h2 class="text-2xl md:text-3xl font-bold text-white">🎉 恭喜完成！</h2>
            </div>
            <div class="p-8 text-center">
              <div class="text-7xl md:text-8xl mb-6">🏆</div>
              <h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3">太棒了！</h3>
              <p class="text-gray-600 mb-8 text-lg">你成功完成了挑战！</p>
              <div class="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 p-8 rounded-2xl mb-8 border-2 border-blue-200">
                <p class="text-xl text-gray-700 mb-2">完成用时</p>
                <p class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  {{ formatTime(totalTime) }}
                </p>
              </div>
              <button
                class="px-10 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xl rounded-2xl shadow-xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
                (click)="resetGame(); showCompletionDialog = false;"
              >
                <span class="text-2xl">🎮</span>
                再玩一次
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .cell-number {
      width: 100%;
      aspect-ratio: 1;
      font-size: 1.5rem;
      font-weight: bold;
      transition: all 0.3s ease;
      border-radius: 1rem;
      cursor: pointer;
      border: none;
      outline: none;
    }

    .cell-number:disabled {
      cursor: not-allowed;
    }

    .cell-default {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }

    .cell-default:hover:not(:disabled) {
      transform: scale(1.08);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
    }

    .cell-correct {
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: white;
      animation: correctPulse 0.5s ease;
      box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
    }

    .cell-wrong {
      background: linear-gradient(135deg, #eb3349 0%, #f45c43 100%);
      color: white;
      animation: wrongShake 0.5s ease;
      box-shadow: 0 4px 15px rgba(235, 51, 73, 0.4);
    }

    .cell-hidden {
      visibility: hidden;
      opacity: 0;
      pointer-events: none;
      transform: scale(0);
    }

    @keyframes correctPulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }

    @keyframes wrongShake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }

    @media (min-width: 768px) {
      .cell-number {
        font-size: 2rem;
        border-radius: 1.25rem;
      }
    }
  `]
})
export class GameComponent implements OnInit {
  cells: NumberCell[] = [];
  nextNumber = 1;
  elapsedTime = 0;
  eliminatedCount = 0;
  gameCompleted = false;
  totalTime = 0;
  showCompletionDialog = false;

  private timer: any;
  private startTime: number = 0;

  ngOnInit(): void {
    this.resetGame();
  }

  resetGame(): void {
    this.stopTimer();
    this.nextNumber = 1;
    this.elapsedTime = 0;
    this.eliminatedCount = 0;
    this.gameCompleted = false;
    this.showCompletionDialog = false;

    const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
    this.shuffleArray(numbers);

    this.cells = numbers.map(value => ({
      value,
      visible: true,
      correct: null
    }));

    this.startTimer();
  }

  private shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  onCellClick(cell: NumberCell): void {
    if (!cell.visible || this.gameCompleted) {
      return;
    }

    if (cell.value === this.nextNumber) {
      cell.correct = true;
      setTimeout(() => {
        cell.visible = false;
      }, 300);
      this.nextNumber++;
      this.eliminatedCount++;

      if (this.eliminatedCount === 25) {
        this.gameCompleted = true;
        this.stopTimer();
        this.totalTime = this.elapsedTime;
        setTimeout(() => {
          this.showCompletionDialog = true;
        }, 500);
      }
    } else {
      cell.correct = false;
      setTimeout(() => {
        this.resetAllCells();
      }, 500);
    }
  }

  private resetAllCells(): void {
    this.nextNumber = 1;
    this.eliminatedCount = 0;

    for (const cell of this.cells) {
      cell.visible = true;
      cell.correct = null;
    }
  }

  getCellClass(cell: NumberCell): string {
    const classes = ['cell-number'];

    if (!cell.visible) {
      classes.push('cell-hidden');
    } else if (cell.correct === true) {
      classes.push('cell-correct');
    } else if (cell.correct === false) {
      classes.push('cell-wrong');
    } else {
      classes.push('cell-default');
    }

    return classes.join(' ');
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);

    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    }
    return `${secs}.${ms.toString().padStart(2, '0')}s`;
  }

  onBackdropClick(event: Event): void {
  }

  private startTimer(): void {
    this.startTime = Date.now();
    this.timer = setInterval(() => {
      this.elapsedTime = (Date.now() - this.startTime) / 1000;
    }, 10);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
