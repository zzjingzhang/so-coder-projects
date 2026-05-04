import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PresetOrbit, PresetOrbits } from '../../core/types/physics.types';
import { SimulationService } from '../../core/services/simulation.service';

@Component({
  selector: 'app-control-panel',
  standalone: false,
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent implements OnInit, OnDestroy {
  presetOrbits: PresetOrbit[] = PresetOrbits;
  selectedPresetIndex = 0;
  isRunning = false;
  simulationTime = 0;
  speedMultipliers = [1, 10, 100, 1000, 10000];
  selectedSpeedIndex = 2;

  orbitForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private simulation: SimulationService
  ) { }

  ngOnInit(): void {
    this.selectedSpeedIndex = this.speedMultipliers.indexOf(100);

    this.orbitForm = this.fb.group({
      semiMajorAxis: ['6771'],
      eccentricity: [0.0001],
      trueAnomaly: [0],
    });

    this.subscriptions.push(
      this.simulation.simulationState$.subscribe(state => {
        this.isRunning = state.running;
        this.simulationTime = state.time;
      }),
      this.orbitForm.valueChanges.subscribe(values => {
        this.updateOrbitalParameters(values);
      })
    );

    this.selectPreset(0);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectPreset(index: number): void {
    this.selectedPresetIndex = index;
    const preset = this.presetOrbits[index];
    const params = {
      semiMajorAxis: preset.semiMajorAxis,
      eccentricity: preset.eccentricity,
      trueAnomaly: 0,
    };

    this.simulation.setInitialParameters({
      ...params,
      inclination: 0,
      argumentOfPeriapsis: 0,
    });
    this.simulation.setOrbitalParameters(params);

    this.orbitForm.patchValue({
      semiMajorAxis: (preset.semiMajorAxis / 1000).toFixed(0),
      eccentricity: preset.eccentricity,
      trueAnomaly: 0,
    }, { emitEvent: false });
  }

  setSpeed(index: number): void {
    this.selectedSpeedIndex = index;
    this.simulation.setSpeedMultiplier(this.speedMultipliers[index]);
  }

  toggleSimulation(): void {
    this.simulation.toggle();
  }

  resetSimulation(): void {
    this.simulation.reset();
    const params = this.simulation.getOrbitalParameters();
    this.orbitForm.patchValue({
      semiMajorAxis: (params.semiMajorAxis / 1000).toFixed(0),
      eccentricity: params.eccentricity,
      trueAnomaly: params.trueAnomaly,
    }, { emitEvent: false });
  }

  private updateOrbitalParameters(values: any): void {
    const params = {
      semiMajorAxis: parseFloat(values.semiMajorAxis) * 1000,
      eccentricity: values.eccentricity,
      trueAnomaly: values.trueAnomaly,
    };

    if (!isNaN(params.semiMajorAxis) && params.semiMajorAxis >= 6771e3 && params.semiMajorAxis <= 50000e3) {
      this.simulation.setOrbitalParameters(params);
    }
  }

  formatSemiMajorAxis(value: number): string {
    return `${value} km`;
  }

  formatEccentricity(value: number): string {
    if (value < 0.001) return '圆形';
    if (value < 0.3) return '低椭圆';
    if (value < 0.7) return '中椭圆';
    return '高椭圆';
  }

  formatTrueAnomaly(value: number): string {
    return `${Math.round((value * 180) / Math.PI)}°`;
  }
}
