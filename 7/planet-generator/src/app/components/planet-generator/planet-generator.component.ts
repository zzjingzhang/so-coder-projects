import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetGeneratorService } from '../../services/planet-generator.service';
import { PlanetParams, GeneratedPlanet, DEFAULT_PLANET_PARAMS, TerrainType } from '../../models/planet.models';
import { PropertiesPanelComponent } from '../properties-panel/properties-panel.component';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { SliderModule } from 'primeng/slider';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-planet-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PropertiesPanelComponent,
    ButtonModule,
    SelectModule,
    InputNumberModule,
    SliderModule,
    PanelModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './planet-generator.component.html',
  styleUrl: './planet-generator.component.css'
})
export class PlanetGeneratorComponent implements OnInit, OnDestroy {
  @ViewChild('planetCanvas', { static: true }) planetCanvas!: ElementRef<HTMLCanvasElement>;
  
  currentPlanet: GeneratedPlanet | null = null;
  planetParams: PlanetParams = { ...DEFAULT_PLANET_PARAMS };
  isGenerating: boolean = false;
  presetOptions = [
    { label: 'Earth-like', value: 'earth-like' },
    { label: 'Mars-like', value: 'mars-like' },
    { label: 'Ice World', value: 'ice-world' },
    { label: 'Desert World', value: 'desert-world' },
    { label: 'Ocean World', value: 'ocean-world' }
  ];
  selectedPreset: string = 'earth-like';
  terrainLegend: { type: TerrainType; label: string; color: string }[] = [];
  
  private animationFrameId: number | null = null;
  private rotationAngle: number = 0;

  constructor(private planetGeneratorService: PlanetGeneratorService) {}

  ngOnInit(): void {
    this.initializeLegend();
    this.generatePlanet();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initializeLegend(): void {
    this.terrainLegend = [
      { type: TerrainType.DEEP_OCEAN, label: 'Deep Ocean', color: '#0c1c3a' },
      { type: TerrainType.OCEAN, label: 'Ocean', color: '#1e3a8a' },
      { type: TerrainType.SHALLOW_WATER, label: 'Shallow Water', color: '#38bdf8' },
      { type: TerrainType.BEACH, label: 'Beach', color: '#faf0a0' },
      { type: TerrainType.DESERT, label: 'Desert', color: '#d97706' },
      { type: TerrainType.GRASSLAND, label: 'Grassland', color: '#059669' },
      { type: TerrainType.FOREST, label: 'Forest', color: '#15803d' },
      { type: TerrainType.MOUNTAIN, label: 'Mountain', color: '#78716c' },
      { type: TerrainType.SNOW, label: 'Snow', color: '#f8fafc' },
      { type: TerrainType.ICE, label: 'Ice', color: '#e0f2fe' }
    ];
  }

  generatePlanet(): void {
    this.isGenerating = true;
    
    setTimeout(() => {
      const canvasSize = 400;
      this.currentPlanet = this.planetGeneratorService.generatePlanet(
        this.planetParams,
        canvasSize
      );
      this.renderPlanet();
      this.isGenerating = false;
    }, 50);
  }

  randomizeSeed(): void {
    this.planetParams.seed = this.planetGeneratorService.generateRandomSeed();
    this.generatePlanet();
  }

  applyPreset(): void {
    this.planetParams = this.planetGeneratorService.createPreset(this.selectedPreset);
    this.generatePlanet();
  }

  onParamChange(): void {
    this.generatePlanet();
  }

  private renderPlanet(): void {
    if (!this.currentPlanet || !this.planetCanvas) return;

    const canvas = this.planetCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = this.planetParams.radius;

    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 10, 0, Math.PI * 2);
    ctx.fill();

    for (const pixel of this.currentPlanet.pixels) {
      const color = pixel.color;
      ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
      ctx.fillRect(pixel.x, pixel.y, 1, 1);
    }

    this.planetGeneratorService.applyShading(canvas, this.planetParams);

    this.planetGeneratorService.applyAtmosphere(canvas, this.currentPlanet, this.planetParams);

    this.renderStars(ctx, canvas.width, canvas.height);
  }

  private renderStars(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const seed = this.planetParams.seed;
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
      const pseudoRandom = Math.sin(seed + i * 1000) * 10000;
      const x = ((pseudoRandom - Math.floor(pseudoRandom)) + 1) % 1 * width;
      const y = ((Math.sin(seed + i * 2000) * 10000 - Math.floor(Math.sin(seed + i * 2000) * 10000)) + 1) % 1 * height;
      
      const dx = x - width / 2;
      const dy = y - height / 2;
      const distFromCenter = Math.sqrt(dx * dx + dy * dy);
      
      if (distFromCenter > this.planetParams.radius + 15) {
        const brightness = 0.3 + ((Math.sin(seed + i * 3000) + 1) / 2) * 0.7;
        ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
        ctx.beginPath();
        ctx.arc(x, y, 1 + Math.random() * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  getTerrainTypeLabel(terrainType: TerrainType): string {
    const legendItem = this.terrainLegend.find(l => l.type === terrainType);
    return legendItem ? legendItem.label : 'Unknown';
  }
}
