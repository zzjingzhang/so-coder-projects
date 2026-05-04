import { Injectable } from '@angular/core';
import { OrbitalParameters, SatelliteState, OrbitData, PhysicalConstants } from '../types/physics.types';

@Injectable({
  providedIn: 'root'
})
export class OrbitalCalculationService {

  calculateOrbitData(params: OrbitalParameters): OrbitData {
    const a = params.semiMajorAxis;
    const e = params.eccentricity;

    const period = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / PhysicalConstants.MU);

    const periapsis = a * (1 - e);
    const apoapsis = a * (1 + e);

    const meanSpeed = (2 * Math.PI * a) / period;

    const periapsisSpeed = Math.sqrt(PhysicalConstants.MU * (2 / periapsis - 1 / a));
    const apoapsisSpeed = Math.sqrt(PhysicalConstants.MU * (2 / apoapsis - 1 / a));

    return {
      period,
      periapsis,
      apoapsis,
      semiMajorAxis: a,
      eccentricity: e,
      meanSpeed,
      periapsisSpeed,
      apoapsisSpeed,
    };
  }

  solveKeplerEquation(meanAnomaly: number, eccentricity: number, tolerance: number = 1e-10): number {
    let E = meanAnomaly;
    if (eccentricity > 0.8) {
      E = Math.PI;
    }

    let delta = 1.0;
    let iterations = 0;
    const maxIterations = 100;

    while (Math.abs(delta) > tolerance && iterations < maxIterations) {
      delta = E - eccentricity * Math.sin(E) - meanAnomaly;
      E = E - delta / (1 - eccentricity * Math.cos(E));
      iterations++;
    }

    return E;
  }

  eccentricToTrueAnomaly(E: number, e: number): number {
    return 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    );
  }

  trueToEccentricAnomaly(theta: number, e: number): number {
    return 2 * Math.atan2(
      Math.sqrt(1 - e) * Math.sin(theta / 2),
      Math.sqrt(1 + e) * Math.cos(theta / 2)
    );
  }

  calculateSatelliteState(params: OrbitalParameters, time: number): SatelliteState {
    const a = params.semiMajorAxis;
    const e = params.eccentricity;
    const n = Math.sqrt(PhysicalConstants.MU / Math.pow(a, 3));

    const E0 = this.trueToEccentricAnomaly(params.trueAnomaly, e);
    const M0 = E0 - e * Math.sin(E0);

    const M = M0 + n * time;
    const E = this.solveKeplerEquation(M, e);
    const theta = this.eccentricToTrueAnomaly(E, e);

    const r = a * (1 - e * e) / (1 + e * Math.cos(theta));

    const p = a * (1 - e * e);
    const h = Math.sqrt(PhysicalConstants.MU * p);

    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    const z = 0;

    const vx = (h / p) * Math.sin(theta);
    const vy = -(h / p) * (e + Math.cos(theta));
    const vz = 0;

    const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);

    return {
      position: { x, y, z },
      velocity: { vx, vy, vz },
      distance: r,
      speed,
      trueAnomaly: theta,
      time,
    };
  }

  getOrbitPoints(params: OrbitalParameters, numPoints: number = 200): { x: number; y: number }[] {
    const points: { x: number; y: number }[] = [];
    const a = params.semiMajorAxis;
    const e = params.eccentricity;

    for (let i = 0; i <= numPoints; i++) {
      const theta = (2 * Math.PI * i) / numPoints;
      const r = a * (1 - e * e) / (1 + e * Math.cos(theta));
      points.push({
        x: r * Math.cos(theta),
        y: r * Math.sin(theta),
      });
    }

    return points;
  }

  formatDistance(meters: number): string {
    if (meters >= 1e6) {
      return (meters / 1000).toFixed(1) + ' km';
    }
    return meters.toFixed(0) + ' m';
  }

  formatTime(seconds: number): string {
    if (seconds < 60) {
      return seconds.toFixed(1) + ' 秒';
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes} 分 ${secs.toFixed(0)} 秒`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} 小时 ${minutes} 分`;
    } else {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      return `${days} 天 ${hours} 小时`;
    }
  }

  formatSpeed(metersPerSecond: number): string {
    if (metersPerSecond >= 1000) {
      return (metersPerSecond / 1000).toFixed(2) + ' km/s';
    }
    return metersPerSecond.toFixed(1) + ' m/s';
  }
}
