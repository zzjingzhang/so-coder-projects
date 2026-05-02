import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ChemicalEquilibriumService, ReactionState } from '../../services/chemical-equilibrium.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-display',
  standalone: true,
  imports: [CommonModule, CardModule, ProgressBarModule, TableModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  private stateSubscription!: Subscription;
  state!: ReactionState;

  constructor(private equilibriumService: ChemicalEquilibriumService) {}

  ngOnInit(): void {
    this.stateSubscription = this.equilibriumService.state$.subscribe((state: ReactionState) => {
      this.state = state;
    });
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
  }

  getTemperatureInCelsius(): number {
    return Math.round(this.state.temperature - 273.15);
  }

  getEquilibriumStatus(): string {
    const diff = Math.abs(this.state.reactionQuotient - this.state.equilibriumConstant);
    if (diff < 0.01) {
      return '已达平衡';
    }
    return this.state.isForwardReaction ? '正向进行中' : '逆向进行中';
  }

  getEquilibriumStatusColor(): string {
    const diff = Math.abs(this.state.reactionQuotient - this.state.equilibriumConstant);
    if (diff < 0.01) {
      return 'text-green-600';
    }
    return this.state.isForwardReaction ? 'text-blue-600' : 'text-red-600';
  }

  isAtEquilibrium(): boolean {
    const diff = Math.abs(this.state.reactionQuotient - this.state.equilibriumConstant);
    return diff < 0.01;
  }

  getTotalMolecules(): number {
    return this.state.no2Concentration + this.state.n2o4Concentration * 2;
  }

  getNo2Percentage(): number {
    const total = this.getTotalMolecules();
    if (total === 0) return 0;
    return (this.state.no2Concentration / total) * 100;
  }

  getN2o4Percentage(): number {
    const total = this.getTotalMolecules();
    if (total === 0) return 0;
    return ((this.state.n2o4Concentration * 2) / total) * 100;
  }

  formatNumber(num: number): string {
    if (num === Infinity) return '∞';
    return num.toFixed(4);
  }
}
