import { Component, OnInit } from '@angular/core';
import { RmbService, CoinState } from '../services/rmb.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coin-converter',
  templateUrl: './coin-converter.component.html',
  styleUrl: './coin-converter.component.css',
  standalone: false
})
export class CoinConverterComponent implements OnInit {
  coinState: CoinState = { yuan: 0, jiao: 0, fen: 0 };
  decimalAmount = 0;
  formattedAmount = '0元';
  private subscription?: Subscription;

  animationStates = {
    yuan: false,
    jiao: false,
    fen: false
  };

  constructor(private rmbService: RmbService) {}

  ngOnInit(): void {
    this.subscription = this.rmbService.coinState$.subscribe(state => {
      this.coinState = state;
      this.decimalAmount = this.rmbService.convertToDecimal(state);
      this.formattedAmount = this.rmbService.formatAmount(state);
    });
  }

  addCoin(unit: 'yuan' | 'jiao' | 'fen'): void {
    this.animationStates[unit] = true;
    this.rmbService.addCoin(unit);
    setTimeout(() => {
      this.animationStates[unit] = false;
    }, 500);
  }

  removeCoin(unit: 'yuan' | 'jiao' | 'fen'): void {
    const result = this.rmbService.removeCoin(unit);
    if (result === null) {
      this.animationStates[unit] = false;
    }
  }

  getCoinsArray(count: number): number[] {
    return Array(Math.min(count, 20)).fill(0);
  }

  reset(): void {
    this.rmbService.reset();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
