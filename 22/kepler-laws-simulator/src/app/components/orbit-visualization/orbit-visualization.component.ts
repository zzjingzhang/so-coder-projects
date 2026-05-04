import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrbitalParameters, SatelliteState, OrbitData, PhysicalConstants } from '../../core/types/physics.types';
import { OrbitalCalculationService } from '../../core/services/orbital-calculation.service';
import { SimulationService } from '../../core/services/simulation.service';

@Component({
  selector: 'app-orbit-visualization',
  standalone: false,
  templateUrl: './orbit-visualization.component.html',
  styleUrls: ['./orbit-visualization.component.css']
})
export class OrbitVisualizationComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private subscriptions: Subscription[] = [];
  private currentState: SatelliteState | null = null;
  private orbitData: OrbitData | null = null;
  private orbitalParams: OrbitalParameters | null = null;
  private orbitPoints: { x: number; y: number }[] = [];
  private trailPoints: { x: number; y: number }[] = [];
  private maxTrailPoints = 50;

  constructor(
    private simulation: SimulationService,
    private orbitalCalculation: OrbitalCalculationService
  ) { }

  ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.orbitalParams = this.simulation.getOrbitalParameters();
    this.orbitData = this.simulation.getOrbitData();
    this.updateOrbitPoints();

    this.subscriptions.push(
      this.simulation.satelliteState$.subscribe(state => {
        this.currentState = state;
        this.addTrailPoint(state.position.x, state.position.y);
        this.draw();
      }),
      this.simulation.simulationState$.subscribe(() => {
        this.orbitalParams = this.simulation.getOrbitalParameters();
        this.orbitData = this.simulation.getOrbitData();
        this.updateOrbitPoints();
        this.draw();
      })
    );

    this.draw();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    window.removeEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth;
      this.canvas.height = container.clientHeight;
      this.draw();
    }
  }

  private updateOrbitPoints(): void {
    if (this.orbitalParams) {
      this.orbitPoints = this.orbitalCalculation.getOrbitPoints(this.orbitalParams);
    }
  }

  private addTrailPoint(x: number, y: number): void {
    this.trailPoints.push({ x, y });
    if (this.trailPoints.length > this.maxTrailPoints) {
      this.trailPoints.shift();
    }
  }

  private draw(): void {
    if (!this.ctx) return;

    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    this.ctx.fillStyle = '#0a0e27';
    this.ctx.fillRect(0, 0, width, height);

    this.drawStars(centerX, centerY);
    this.drawScale();
    const scale = this.calculateScale();
    this.drawOrbit(centerX, centerY, scale);
    this.drawPeriapsisApoapsis(centerX, centerY, scale);
    this.drawEarth(centerX, centerY, scale);
    this.drawTrail(centerX, centerY, scale);
    this.drawSatellite(centerX, centerY, scale);
    this.drawVelocityVector(centerX, centerY, scale);
  }

  private drawStars(centerX: number, centerY: number): void {
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    for (let i = 0; i < 100; i++) {
      const x = Math.sin(i * 123.456) * 10000 % centerX * 2;
      const y = Math.cos(i * 789.012) * 10000 % centerY * 2;
      const size = (i % 3) + 0.5;
      this.ctx.beginPath();
      this.ctx.arc(Math.abs(x), Math.abs(y), size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawScale(): void {
    if (!this.orbitData) return;

    const scale = this.calculateScale();
    const referenceDistance = this.orbitData.apoapsis;
    const referenceKm = Math.round(referenceDistance / 1000);

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'left';

    const barX = 20;
    const barY = this.canvas.height - 40;
    const barWidth = 100;

    this.ctx.fillStyle = '#00d4ff';
    this.ctx.fillRect(barX, barY, barWidth, 2);

    this.ctx.fillStyle = '#00d4ff';
    this.ctx.fillRect(barX, barY - 4, 2, 10);
    this.ctx.fillRect(barX + barWidth, barY - 4, 2, 10);

    const scaleKm = Math.round(Math.abs(barWidth / scale / 1000));
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(
      `约 ${scaleKm} km`,
      barX + barWidth / 2,
      barY + 20
    );
  }

  private calculateScale(): number {
    if (!this.orbitData) return 0.0001;

    const margin = 80;
    const availableWidth = this.canvas.width - margin * 2;
    const availableHeight = this.canvas.height - margin * 2;
    const maxDimension = Math.min(availableWidth, availableHeight);
    const maxOrbit = this.orbitData.apoapsis * 1.2;

    return maxDimension / (maxOrbit * 2);
  }

  private drawOrbit(centerX: number, centerY: number, scale: number): void {
    if (this.orbitPoints.length === 0) return;

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
    this.ctx.lineWidth = 1.5;
    this.ctx.setLineDash([5, 5]);

    this.orbitPoints.forEach((point, index) => {
      const x = centerX + point.x * scale;
      const y = centerY + point.y * scale;
      if (index === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    });

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }

  private drawPeriapsisApoapsis(centerX: number, centerY: number, scale: number): void {
    if (!this.orbitalParams) return;

    const a = this.orbitalParams.semiMajorAxis;
    const e = this.orbitalParams.eccentricity;

    const periapsisX = centerX - a * (1 - e) * scale;
    const periapsisY = centerY;

    const apoapsisX = centerX + a * (1 + e) * scale;
    const apoapsisY = centerY;

    this.ctx.fillStyle = '#ff6b6b';
    this.ctx.beginPath();
    this.ctx.arc(periapsisX, periapsisY, 6, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#4ecdc4';
    this.ctx.beginPath();
    this.ctx.arc(apoapsisX, apoapsisY, 6, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    this.ctx.font = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('近地点', periapsisX, periapsisY - 12);
    this.ctx.fillText('远地点', apoapsisX, apoapsisY - 12);
  }

  private drawEarth(centerX: number, centerY: number, scale: number): void {
    const earthRadius = PhysicalConstants.EARTH_RADIUS * scale;
    const minRadius = 12;
    const maxRadius = 45;
    let displayRadius = earthRadius;

    if (displayRadius < minRadius) {
      displayRadius = minRadius;
    } else if (displayRadius > maxRadius) {
      displayRadius = maxRadius;
    }

    const gradient = this.ctx.createRadialGradient(
      centerX, centerY, displayRadius,
      centerX, centerY, displayRadius * 1.3
    );
    gradient.addColorStop(0, 'rgba(74, 144, 226, 0.3)');
    gradient.addColorStop(1, 'rgba(74, 144, 226, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, displayRadius * 1.3, 0, Math.PI * 2);
    this.ctx.fill();

    const earthGradient = this.ctx.createRadialGradient(
      centerX - displayRadius * 0.3, centerY - displayRadius * 0.3, 0,
      centerX, centerY, displayRadius
    );
    earthGradient.addColorStop(0, '#6ec6ff');
    earthGradient.addColorStop(0.5, '#4a90e2');
    earthGradient.addColorStop(1, '#1976d2');

    this.ctx.fillStyle = earthGradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, displayRadius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.ellipse(centerX, centerY, displayRadius, displayRadius * 0.3, 0, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  private drawTrail(centerX: number, centerY: number, scale: number): void {
    if (this.trailPoints.length < 2) return;

    this.ctx.beginPath();
    for (let i = 0; i < this.trailPoints.length; i++) {
      const point = this.trailPoints[i];
      const x = centerX + point.x * scale;
      const y = centerY + point.y * scale;

      const alpha = (i + 1) / this.trailPoints.length;
      this.ctx.strokeStyle = `rgba(255, 215, 0, ${alpha * 0.8})`;
      this.ctx.lineWidth = alpha * 3;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
      }
    }
  }

  private drawSatellite(centerX: number, centerY: number, scale: number): void {
    if (!this.currentState) return;

    const { x, y } = this.currentState.position;
    const screenX = centerX + x * scale;
    const screenY = centerY + y * scale;

    const angle = Math.atan2(y, x);

    this.ctx.save();
    this.ctx.translate(screenX, screenY);
    this.ctx.rotate(angle);

    const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
    gradient.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 15, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = '#003366';
    this.ctx.fillRect(-20, -4, -12, 8);
    this.ctx.fillRect(8, -4, 12, 8);

    this.ctx.fillStyle = '#ffd700';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 5, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(-18, -2);
    this.ctx.lineTo(-18, 2);
    this.ctx.moveTo(-14, -2);
    this.ctx.lineTo(-14, 2);
    this.ctx.moveTo(10, -2);
    this.ctx.lineTo(10, 2);
    this.ctx.moveTo(14, -2);
    this.ctx.lineTo(14, 2);
    this.ctx.stroke();

    this.ctx.restore();
  }

  private drawVelocityVector(centerX: number, centerY: number, scale: number): void {
    if (!this.currentState) return;

    const { x, y } = this.currentState.position;
    const { vx, vy } = this.currentState.velocity;
    const screenX = centerX + x * scale;
    const screenY = centerY + y * scale;

    const speed = Math.sqrt(vx * vx + vy * vy);
    const maxSpeed = this.orbitData ? this.orbitData.periapsisSpeed : speed;
    const vectorLength = (speed / maxSpeed) * 60;

    if (vectorLength < 5) return;

    const angle = Math.atan2(vy, vx);
    const endX = screenX + Math.cos(angle) * vectorLength;
    const endY = screenY + Math.sin(angle) * vectorLength;

    this.ctx.beginPath();
    this.ctx.strokeStyle = '#4ade80';
    this.ctx.lineWidth = 2;
    this.ctx.moveTo(screenX, screenY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    const arrowSize = 8;
    const arrowAngle = Math.PI / 6;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#4ade80';
    this.ctx.moveTo(endX, endY);
    this.ctx.lineTo(
      endX - arrowSize * Math.cos(angle - arrowAngle),
      endY - arrowSize * Math.sin(angle - arrowAngle)
    );
    this.ctx.lineTo(
      endX - arrowSize * Math.cos(angle + arrowAngle),
      endY - arrowSize * Math.sin(angle + arrowAngle)
    );
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.fillStyle = 'rgba(74, 222, 128, 0.8)';
    this.ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('v', (screenX + endX) / 2, (screenY + endY) / 2 - 8);
  }
}
