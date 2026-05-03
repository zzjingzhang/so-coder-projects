import { Component, OnInit } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { CommonModule } from '@angular/common';

interface Card {
  suit: string;
  value: number;
  display: string;
  suitSymbol: string;
  id: number;
  isFlipped: boolean;
  isMatched: boolean;
}

enum GameState {
  Idle = 'idle',
  Memorizing = 'memorizing',
  Playing = 'playing',
  Completed = 'completed'
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzModalModule,
    NzStatisticModule,
    NzSpaceModule
  ],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards: Card[] = [];
  gameState: GameState = GameState.Idle;
  nextExpectedValue: number = 1;
  
  memorizeTime: number = 0;
  gameTime: number = 0;
  flipCount: number = 0;
  
  private memorizeTimer: any = null;
  private gameTimer: any = null;
  
  suits = [
    { name: 'hearts', symbol: '♥', color: 'text-red-500' },
    { name: 'diamonds', symbol: '♦', color: 'text-red-500' },
    { name: 'clubs', symbol: '♣', color: 'text-gray-800' },
    { name: 'spades', symbol: '♠', color: 'text-gray-800' }
  ];
  
  valueDisplay: { [key: number]: string } = {
    1: 'A',
    11: 'J',
    12: 'Q',
    13: 'K'
  };

  constructor(private modal: NzModalService) {}

  ngOnInit(): void {}

  getValueDisplay(value: number): string {
    return this.valueDisplay[value] || value.toString();
  }

  dealCards(): void {
    this.resetGame();
    this.cards = this.generateRandomCards(9);
    this.startMemorizing();
  }

  private generateRandomCards(count: number): Card[] {
    const allCards: Card[] = [];
    let id = 0;
    
    for (const suit of this.suits) {
      for (let value = 1; value <= 13; value++) {
        allCards.push({
          suit: suit.name,
          suitSymbol: suit.symbol,
          value: value,
          display: this.getValueDisplay(value),
          id: id++,
          isFlipped: true,
          isMatched: false
        });
      }
    }
    
    this.shuffleArray(allCards);
    const selectedCards = allCards.slice(0, count);
    this.shuffleArray(selectedCards);
    
    return selectedCards.map((card, index) => ({
      ...card,
      id: index
    }));
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private startMemorizing(): void {
    this.gameState = GameState.Memorizing;
    this.memorizeTime = 0;
    
    this.memorizeTimer = setInterval(() => {
      this.memorizeTime++;
    }, 1000);
  }

  startPlaying(): void {
    if (this.memorizeTimer) {
      clearInterval(this.memorizeTimer);
      this.memorizeTimer = null;
    }
    
    this.cards.forEach(card => {
      card.isFlipped = false;
    });
    
    const sortedValues = [...this.cards].sort((a, b) => a.value - b.value).map(c => c.value);
    this.nextExpectedValue = sortedValues[0];
    
    this.gameState = GameState.Playing;
    this.gameTime = 0;
    
    this.gameTimer = setInterval(() => {
      this.gameTime++;
    }, 1000);
  }

  flipCard(card: Card): void {
    if (this.gameState !== GameState.Playing || card.isFlipped || card.isMatched) {
      return;
    }
    
    this.flipCount++;
    card.isFlipped = true;
    
    if (card.value === this.nextExpectedValue) {
      card.isMatched = true;
      
      const remainingCards = this.cards.filter(c => !c.isMatched);
      if (remainingCards.length === 0) {
        this.completeGame();
      } else {
        const nextValue = remainingCards.reduce((min, c) => c.value < min.value ? c : min).value;
        this.nextExpectedValue = nextValue;
      }
    } else {
      setTimeout(() => {
        if (!card.isMatched) {
          card.isFlipped = false;
        }
      }, 1000);
    }
  }

  private completeGame(): void {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    
    this.gameState = GameState.Completed;
    
    this.modal.success({
      nzTitle: '🎉 恭喜你完成游戏！',
      nzContent: `
        <div style="font-size: 16px; line-height: 2;">
          <p>📚 记忆时间：<strong>${this.formatTime(this.memorizeTime)}</strong></p>
          <p>⏱️ 游戏时间：<strong>${this.formatTime(this.gameTime)}</strong></p>
          <p>🎯 翻牌次数：<strong>${this.flipCount}</strong></p>
        </div>
      `,
      nzOkText: '再玩一次',
      nzOnOk: () => this.dealCards()
    });
  }

  private resetGame(): void {
    if (this.memorizeTimer) {
      clearInterval(this.memorizeTimer);
      this.memorizeTimer = null;
    }
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
      this.gameTimer = null;
    }
    
    this.cards = [];
    this.gameState = GameState.Idle;
    this.memorizeTime = 0;
    this.gameTime = 0;
    this.flipCount = 0;
    this.nextExpectedValue = 1;
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  get isIdle(): boolean {
    return this.gameState === GameState.Idle;
  }

  get isMemorizing(): boolean {
    return this.gameState === GameState.Memorizing;
  }

  get isPlaying(): boolean {
    return this.gameState === GameState.Playing;
  }

  getSuitColor(suit: string): string {
    return (suit === 'hearts' || suit === 'diamonds') ? 'text-red-500' : 'text-gray-800';
  }
}
