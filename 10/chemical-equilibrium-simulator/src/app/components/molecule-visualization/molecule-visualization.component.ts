import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChemicalEquilibriumService, Molecule, ReactionState } from '../../services/chemical-equilibrium.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-molecule-visualization',
  standalone: true,
  imports: [CommonModule, CardModule],
  templateUrl: './molecule-visualization.component.html',
  styleUrl: './molecule-visualization.component.css'
})
export class MoleculeVisualizationComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId!: number;
  private stateSubscription!: Subscription;
  private currentState!: ReactionState;
  private containerWidth!: number;
  private containerHeight!: number;

  constructor(private equilibriumService: ChemicalEquilibriumService) {}

  ngOnInit(): void {
    const dimensions = this.equilibriumService.getContainerDimensions();
    this.containerWidth = dimensions.width;
    this.containerHeight = dimensions.height;

    this.canvas.nativeElement.width = this.containerWidth;
    this.canvas.nativeElement.height = this.containerHeight;
    this.ctx = this.canvas.nativeElement.getContext('2d')!;

    this.stateSubscription = this.equilibriumService.state$.subscribe((state: ReactionState) => {
      this.currentState = state;
    });

    this.startAnimation();
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private startAnimation(): void {
    const animate = () => {
      this.equilibriumService.updateReaction();
      this.draw();
      this.animationFrameId = requestAnimationFrame(animate);
    };
    animate();
  }

  private draw(): void {
    if (!this.currentState || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.containerWidth, this.containerHeight);

    this.drawContainer();
    this.drawMolecules(this.currentState.molecules);
    this.drawReactionIndicator();
  }

  private drawContainer(): void {
    const intensity = this.currentState.colorIntensity;
    const alpha = intensity / 200;

    const gradient = this.ctx.createRadialGradient(
      this.containerWidth / 2,
      this.containerHeight / 2,
      0,
      this.containerWidth / 2,
      this.containerHeight / 2,
      this.containerWidth / 2
    );
    gradient.addColorStop(0, `rgba(139, 69, 19, ${alpha})`);
    gradient.addColorStop(1, `rgba(255, 255, 255, 0.1)`);

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.containerWidth, this.containerHeight);

    this.ctx.strokeStyle = '#374151';
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(0, 0, this.containerWidth, this.containerHeight);

    this.ctx.fillStyle = '#374151';
    this.ctx.font = '14px sans-serif';
    this.ctx.fillText('反应容器', 10, this.containerHeight - 10);
  }

  private drawMolecules(molecules: Molecule[]): void {
    molecules.forEach(molecule => {
      if (molecule.type === 'NO2') {
        this.drawNo2Molecule(molecule);
      } else {
        this.drawN2o4Molecule(molecule);
      }
    });
  }

  private drawNo2Molecule(molecule: Molecule): void {
    const { x, y, radius } = molecule;

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#8B0000';
    this.ctx.fill();
    this.ctx.strokeStyle = '#5C0000';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(x, y, radius * 0.6, 0, Math.PI * 2);
    this.ctx.fillStyle = '#A52A2A';
    this.ctx.fill();

    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = '8px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('NO₂', x, y);
  }

  private drawN2o4Molecule(molecule: Molecule): void {
    const { x, y, radius } = molecule;

    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radius * 1.5, radius, 0, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(200, 200, 200, 0.9)';
    this.ctx.fill();
    this.ctx.strokeStyle = '#666666';
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

    this.ctx.fillStyle = '#333333';
    this.ctx.font = '9px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('N₂O₄', x, y);
  }

  private drawReactionIndicator(): void {
    const { isForwardReaction, reactionQuotient, equilibriumConstant } = this.currentState;
    const atEquilibrium = Math.abs(reactionQuotient - equilibriumConstant) < 0.01;

    const indicatorX = this.containerWidth / 2;
    const indicatorY = 30;

    this.ctx.fillStyle = '#1F2937';
    this.ctx.fillRect(indicatorX - 100, indicatorY - 15, 200, 30);
    this.ctx.strokeStyle = '#4B5563';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(indicatorX - 100, indicatorY - 15, 200, 30);

    this.ctx.fillStyle = atEquilibrium ? '#10B981' : (isForwardReaction ? '#3B82F6' : '#EF4444');
    this.ctx.font = 'bold 12px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    let statusText = '';
    if (atEquilibrium) {
      statusText = '⚖️ 平衡状态';
    } else if (isForwardReaction) {
      statusText = '→ 正向反应 (2NO₂ → N₂O₄)';
    } else {
      statusText = '← 逆向反应 (N₂O₄ → 2NO₂)';
    }

    this.ctx.fillText(statusText, indicatorX, indicatorY);
  }
}
