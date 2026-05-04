import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CoinState {
  yuan: number;
  jiao: number;
  fen: number;
}

export interface GameTarget {
  yuan: number;
  jiao: number;
  fen: number;
  decimal: number;
}

export interface GameLevel {
  name: string;
  minYuan: number;
  maxYuan: number;
  includeJiao: boolean;
  includeFen: boolean;
  timeLimit: number;
}

@Injectable({
  providedIn: 'root'
})
export class RmbService {
  private coinStateSubject = new BehaviorSubject<CoinState>({ yuan: 0, jiao: 0, fen: 0 });
  coinState$ = this.coinStateSubject.asObservable();

  private gameLevels: GameLevel[] = [
    { name: '初级', minYuan: 0, maxYuan: 5, includeJiao: false, includeFen: false, timeLimit: 60 },
    { name: '中级', minYuan: 0, maxYuan: 10, includeJiao: true, includeFen: false, timeLimit: 90 },
    { name: '高级', minYuan: 0, maxYuan: 20, includeJiao: true, includeFen: true, timeLimit: 120 }
  ];

  constructor() {}

  getCoinState(): CoinState {
    return this.coinStateSubject.value;
  }

  updateCoinState(state: CoinState): void {
    this.coinStateSubject.next(state);
  }

  addCoin(unit: 'yuan' | 'jiao' | 'fen', amount: number = 1): CoinState {
    const current = this.coinStateSubject.value;
    const newState = { ...current, [unit]: current[unit] + amount };
    const convertedState = this.autoConvert(newState);
    this.coinStateSubject.next(convertedState);
    return convertedState;
  }

  removeCoin(unit: 'yuan' | 'jiao' | 'fen', amount: number = 1): CoinState | null {
    const current = this.coinStateSubject.value;
    if (current[unit] < amount) {
      return null;
    }
    const newState = { ...current, [unit]: current[unit] - amount };
    this.coinStateSubject.next(newState);
    return newState;
  }

  autoConvert(state: CoinState): CoinState {
    let { yuan, jiao, fen } = state;

    while (fen >= 10) {
      fen -= 10;
      jiao += 1;
    }

    while (jiao >= 10) {
      jiao -= 10;
      yuan += 1;
    }

    return { yuan, jiao, fen };
  }

  convertToDecimal(state: CoinState): number {
    return state.yuan + state.jiao * 0.1 + state.fen * 0.01;
  }

  convertFromDecimal(amount: number): CoinState {
    const yuan = Math.floor(amount);
    const remaining = amount - yuan;
    const jiao = Math.floor(remaining * 10);
    const fen = Math.round((remaining * 100) % 10);
    return { yuan, jiao, fen };
  }

  formatDecimal(amount: number): string {
    return amount.toFixed(2);
  }

  formatAmount(state: CoinState): string {
    const parts: string[] = [];
    if (state.yuan > 0) parts.push(`${state.yuan}元`);
    if (state.jiao > 0) parts.push(`${state.jiao}角`);
    if (state.fen > 0) parts.push(`${state.fen}分`);
    return parts.length > 0 ? parts.join('') : '0元';
  }

  generateGameTarget(levelIndex: number = 0): GameTarget {
    const level = this.gameLevels[Math.min(levelIndex, this.gameLevels.length - 1)];
    let yuan = Math.floor(Math.random() * (level.maxYuan - level.minYuan + 1)) + level.minYuan;
    let jiao = level.includeJiao ? Math.floor(Math.random() * 10) : 0;
    let fen = level.includeFen ? Math.floor(Math.random() * 10) : 0;

    const state = this.autoConvert({ yuan, jiao, fen });
    const decimal = this.convertToDecimal(state);

    return {
      yuan: state.yuan,
      jiao: state.jiao,
      fen: state.fen,
      decimal: decimal
    };
  }

  checkMatch(current: CoinState, target: GameTarget): boolean {
    const currentDecimal = this.convertToDecimal(current);
    return Math.abs(currentDecimal - target.decimal) < 0.001;
  }

  getGameLevels(): GameLevel[] {
    return [...this.gameLevels];
  }

  reset(): void {
    this.coinStateSubject.next({ yuan: 0, jiao: 0, fen: 0 });
  }
}
