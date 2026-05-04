import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { OrbitalParameters, SatelliteState, OrbitData } from '../types/physics.types';
import { OrbitalCalculationService } from './orbital-calculation.service';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {
  private isRunning = false;
  private animationFrameId: number | null = null;
  private simulationTime = 0;
  private speedMultiplier = 100;
  private lastTimestamp: number | null = null;

  private initialOrbitalParams: OrbitalParameters = {
    semiMajorAxis: 6771e3,
    eccentricity: 0.0001,
    inclination: 0,
    trueAnomaly: 0,
    argumentOfPeriapsis: 0,
  };

  private orbitalParams: OrbitalParameters = {
    ...this.initialOrbitalParams
  };

  private satelliteStateSubject = new Subject<SatelliteState>();
  private simulationStateSubject = new Subject<{ running: boolean; time: number }>();

  satelliteState$: Observable<SatelliteState> = this.satelliteStateSubject.asObservable();
  simulationState$: Observable<{ running: boolean; time: number }> = this.simulationStateSubject.asObservable();

  constructor(
    private orbitalCalculation: OrbitalCalculationService,
    private ngZone: NgZone
  ) { }

  getOrbitalParameters(): OrbitalParameters {
    return { ...this.orbitalParams };
  }

  setOrbitalParameters(params: Partial<OrbitalParameters>): void {
    this.orbitalParams = { ...this.orbitalParams, ...params };
    if (!this.isRunning) {
      this.updateSatelliteState();
    }
  }

  getSpeedMultiplier(): number {
    return this.speedMultiplier;
  }

  setSpeedMultiplier(multiplier: number): void {
    this.speedMultiplier = multiplier;
  }

  getSimulationTime(): number {
    return this.simulationTime;
  }

  getOrbitData(): OrbitData {
    return this.orbitalCalculation.calculateOrbitData(this.orbitalParams);
  }

  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTimestamp = performance.now();
    this.simulationStateSubject.next({ running: this.isRunning, time: this.simulationTime });
    this.ngZone.runOutsideAngular(() => {
      this.animationLoop();
    });
  }

  pause(): void {
    this.isRunning = false;
    this.simulationStateSubject.next({ running: this.isRunning, time: this.simulationTime });
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  toggle(): void {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  reset(): void {
    this.isRunning = false;
    this.simulationTime = 0;
    this.lastTimestamp = null;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.orbitalParams = {
      ...this.initialOrbitalParams
    };
    this.simulationStateSubject.next({ running: this.isRunning, time: this.simulationTime });
    this.updateSatelliteState();
  }

  setInitialParameters(params: OrbitalParameters): void {
    this.initialOrbitalParams = { ...params };
  }

  isSimulationRunning(): boolean {
    return this.isRunning;
  }

  private animationLoop(): void {
    if (!this.isRunning) return;

    const now = performance.now();
    if (this.lastTimestamp === null) {
      this.lastTimestamp = now;
    }

    const deltaTime = (now - this.lastTimestamp) / 1000;
    this.lastTimestamp = now;

    const orbitData = this.getOrbitData();
    const realTimeFactor = orbitData.period / 10;
    this.simulationTime += deltaTime * this.speedMultiplier * realTimeFactor;

    this.updateSatelliteState();

    this.animationFrameId = requestAnimationFrame(() => this.animationLoop());
  }

  private updateSatelliteState(): void {
    const state = this.orbitalCalculation.calculateSatelliteState(this.orbitalParams, this.simulationTime);
    this.satelliteStateSubject.next(state);
    this.simulationStateSubject.next({ running: this.isRunning, time: this.simulationTime });
  }
}
