import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SatelliteState, OrbitData } from '../../core/types/physics.types';
import { OrbitalCalculationService } from '../../core/services/orbital-calculation.service';
import { SimulationService } from '../../core/services/simulation.service';

@Component({
  selector: 'app-data-display',
  standalone: false,
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  satelliteState: SatelliteState = {
    position: { x: 0, y: 0, z: 0 },
    velocity: { vx: 0, vy: 0, vz: 0 },
    distance: 0,
    speed: 0,
    trueAnomaly: 0,
    time: 0,
  };
  orbitData: OrbitData = {
    period: 0,
    periapsis: 0,
    apoapsis: 0,
    semiMajorAxis: 0,
    eccentricity: 0,
    meanSpeed: 0,
    periapsisSpeed: 0,
    apoapsisSpeed: 0,
  };
  isRunning = false;
  private subscriptions: Subscription[] = [];

  keplerLaws = [
    {
      number: 1,
      title: '椭圆定律',
      description: '所有行星绕太阳运动的轨道都是椭圆，太阳位于椭圆的一个焦点上。',
      icon: 'experiment'
    },
    {
      number: 2,
      title: '面积定律',
      description: '在相等时间内，太阳和运动中的行星的连线所扫过的面积都是相等的。',
      icon: 'border'
    },
    {
      number: 3,
      title: '周期定律',
      description: '各个行星绕太阳公转周期的平方和它们的椭圆轨道半长轴的立方成正比。',
      icon: 'clock-circle'
    }
  ];

  constructor(
    private simulation: SimulationService,
    private orbitalCalculation: OrbitalCalculationService
  ) { }

  ngOnInit(): void {
    this.orbitData = this.simulation.getOrbitData();

    this.subscriptions.push(
      this.simulation.satelliteState$.subscribe(state => {
        this.satelliteState = state;
      }),
      this.simulation.simulationState$.subscribe(() => {
        this.orbitData = this.simulation.getOrbitData();
        this.isRunning = this.simulation.isSimulationRunning();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  formatDistance(meters: number): string {
    return this.orbitalCalculation.formatDistance(meters);
  }

  formatTime(seconds: number): string {
    return this.orbitalCalculation.formatTime(seconds);
  }

  formatSpeed(metersPerSecond: number): string {
    return this.orbitalCalculation.formatSpeed(metersPerSecond);
  }

  formatAngle(radians: number): string {
    const degrees = (radians * 180) / Math.PI;
    return `${degrees.toFixed(1)}°`;
  }

  getEccentricityLabel(e: number): string {
    if (e < 0.001) return '圆形轨道';
    if (e < 0.3) return '低椭圆轨道';
    if (e < 0.7) return '中椭圆轨道';
    return '高椭圆轨道';
  }

  getEccentricityColor(e: number): string {
    if (e < 0.001) return '#52c41a';
    if (e < 0.3) return '#1890ff';
    if (e < 0.7) return '#faad14';
    return '#ff4d4f';
  }

  getSpeedComparison(): { current: number; max: number; min: number; percentage: number } {
    const current = this.satelliteState.speed;
    const max = this.orbitData.periapsisSpeed;
    const min = this.orbitData.apoapsisSpeed;

    if (max === min) {
      return { current, max, min, percentage: 50 };
    }

    const percentage = ((current - min) / (max - min)) * 100;

    return { current, max, min, percentage };
  }

  getAreaLawDescription(): string {
    const comparison = this.getSpeedComparison();
    if (comparison.percentage > 80) {
      return '当前卫星接近近地点，速度较快，扫过的面积速率恒定。';
    } else if (comparison.percentage < 20) {
      return '当前卫星接近远地点，速度较慢，扫过的面积速率恒定。';
    } else {
      return '卫星在椭圆轨道上运动，近地点最快，远地点最慢。';
    }
  }
}
