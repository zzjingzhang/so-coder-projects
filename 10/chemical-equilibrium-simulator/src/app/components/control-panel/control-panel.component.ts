import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';
import { ChemicalEquilibriumService, ReactionState } from '../../services/chemical-equilibrium.service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SliderModule,
    ButtonModule,
    InputNumberModule,
    CardModule
  ],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent implements OnInit {
  temperature: number = 298;
  minTemperature: number = 200;
  maxTemperature: number = 500;
  no2ToAdd: number = 10;
  n2o4ToAdd: number = 5;

  constructor(private equilibriumService: ChemicalEquilibriumService) {}

  ngOnInit(): void {
    this.equilibriumService.state$.subscribe((state: ReactionState) => {
      this.temperature = state.temperature;
    });
  }

  onTemperatureChange(): void {
    this.equilibriumService.setTemperature(this.temperature);
  }

  addNo2(): void {
    if (this.no2ToAdd > 0) {
      this.equilibriumService.addNo2(this.no2ToAdd);
    }
  }

  addN2o4(): void {
    if (this.n2o4ToAdd > 0) {
      this.equilibriumService.addN2o4(this.n2o4ToAdd);
    }
  }

  reset(): void {
    this.equilibriumService.reset();
  }

  getTemperatureInCelsius(): number {
    return Math.round(this.temperature - 273.15);
  }
}
