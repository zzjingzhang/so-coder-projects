import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NoiseService } from '../../services/noise.service';

interface PlanetConfig {
  seed: number;
  noiseLevel: number;
  waterLevel: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  scale: number;
}

@Component({
  selector: 'app-planet-generator',
  templateUrl: './planet-generator.component.html',
  styleUrls: ['./planet-generator.component.css']
})
export class PlanetGeneratorComponent implements OnInit, OnChanges {
  @ViewChild('planetCanvas') planetCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('miniMapCanvas') miniMapCanvas!: ElementRef<HTMLCanvasElement>;
  
  @Input() seed: number = 42;
  @Input() noiseLevel: number = 5;
  @Input() waterLevel: number = 0.4;
  @Input() octaves: number = 6;
  @Input() persistence: number = 0.5;
  @Input() lacunarity: number = 2.0;
  @Input() scale: number = 3.0;
  
  private config: PlanetConfig = {
    seed: 42,
    noiseLevel: 5,
    waterLevel: 0.4,
    octaves: 6,
    persistence: 0.5,
    lacunarity: 2.0,
    scale: 3.0
  };
  
  private animationId: number = 0;
  private rotation: number = 0;

  constructor(private noiseService: NoiseService) {}

  ngOnInit(): void {
    this.updateConfig();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateConfig();
    if (this.planetCanvas) {
      this.renderPlanet();
    }
  }

  private updateConfig(): void {
    this.config = {
      seed: this.seed,
      noiseLevel: this.noiseLevel,
      waterLevel: this.waterLevel,
      octaves: this.octaves,
      persistence: this.persistence,
      lacunarity: this.lacunarity,
      scale: this.scale
    };
  }

  ngAfterViewInit(): void {
    this.renderPlanet();
    this.renderMiniMap();
    this.startRotation();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startRotation(): void {
    const animate = () => {
      this.rotation += 0.002;
      this.renderPlanet();
      this.animationId = requestAnimationFrame(animate);
    };
    this.animationId = requestAnimationFrame(animate);
  }

  private renderPlanet(): void {
    const canvas = this.planetCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);

    this.drawStars(ctx, width, height);
    this.drawAtmosphere(ctx, centerX, centerY, radius);
    this.drawPlanet(ctx, centerX, centerY, radius);
    this.drawClouds(ctx, centerX, centerY, radius);
  }

  private drawStars(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    const starCount = 200;
    this.noiseService.setSeed(this.config.seed);
    
    for (let i = 0; i < starCount; i++) {
      const x = (this.noiseService.perlin2D(i * 0.1, 0) + 1) / 2 * width;
      const y = (this.noiseService.perlin2D(i * 0.1, 1) + 1) / 2 * height;
      const size = (this.noiseService.perlin2D(i * 0.1, 2) + 1) / 2 * 2 + 0.5;
      const brightness = (this.noiseService.perlin2D(i * 0.1, 3) + 1) / 2;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + brightness * 0.7})`;
      ctx.fill();
    }
  }

  private drawAtmosphere(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius,
      centerX, centerY, radius * 1.3
    );
    gradient.addColorStop(0, 'rgba(100, 180, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(100, 180, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(100, 180, 255, 0)');
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  private drawPlanet(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    const imageData = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
    const data = imageData.data;
    
    this.noiseService.setSeed(this.config.seed);
    
    for (let y = 0; y < ctx.canvas.height; y++) {
      for (let x = 0; x < ctx.canvas.width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist <= radius) {
          const nx = dx / radius;
          const ny = dy / radius;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
          
          const rotatedNx = nx * Math.cos(this.rotation) - nz * Math.sin(this.rotation);
          const rotatedNz = nx * Math.sin(this.rotation) + nz * Math.cos(this.rotation);
          
          const lon = Math.atan2(rotatedNx, rotatedNz);
          const lat = Math.asin(ny);
          
          const noiseX = (lon / Math.PI + 1) * this.config.scale;
          const noiseY = (lat / (Math.PI / 2) + 1) * this.config.scale;
          
          const noiseValue = (this.noiseService.fbm(
            noiseX,
            noiseY,
            this.config.octaves,
            this.config.persistence,
            this.config.lacunarity
          ) + 1) / 2;
          
          const color = this.getTerrainColor(noiseValue);
          
          const lightX = -0.5;
          const lightY = -0.5;
          const lightZ = 1;
          const lightMag = Math.sqrt(lightX * lightX + lightY * lightY + lightZ * lightZ);
          const lx = lightX / lightMag;
          const ly = lightY / lightMag;
          const lz = lightZ / lightMag;
          
          const dotProduct = nx * lx + ny * ly + nz * lz;
          const lighting = Math.max(0.2, dotProduct);
          
          const idx = (y * ctx.canvas.width + x) * 4;
          data[idx] = Math.min(255, Math.floor(color.r * lighting));
          data[idx + 1] = Math.min(255, Math.floor(color.g * lighting));
          data[idx + 2] = Math.min(255, Math.floor(color.b * lighting));
          data[idx + 3] = 255;
        }
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  private getTerrainColor(elevation: number): { r: number; g: number; b: number } {
    const waterLevel = this.config.waterLevel;
    
    if (elevation < waterLevel - 0.15) {
      return { r: 10, g: 36, b: 99 };
    } else if (elevation < waterLevel - 0.05) {
      return { r: 20, g: 60, b: 120 };
    } else if (elevation < waterLevel) {
      const t = (elevation - (waterLevel - 0.05)) / 0.05;
      return {
        r: Math.floor(20 + (62 - 20) * t),
        g: Math.floor(60 + (146 - 60) * t),
        b: Math.floor(120 + (204 - 120) * t)
      };
    } else if (elevation < waterLevel + 0.02) {
      return { r: 210, g: 180, b: 140 };
    } else if (elevation < waterLevel + 0.15) {
      return { r: 88, g: 129, b: 87 };
    } else if (elevation < waterLevel + 0.3) {
      return { r: 58, g: 90, b: 64 };
    } else if (elevation < waterLevel + 0.4) {
      return { r: 163, g: 177, b: 138 };
    } else if (elevation < waterLevel + 0.5) {
      return { r: 107, g: 107, b: 107 };
    } else {
      return { r: 248, g: 249, b: 250 };
    }
  }

  private drawClouds(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number): void {
    this.noiseService.setSeed(this.config.seed + 1000);
    
    const cloudRadius = radius * 1.02;
    
    for (let angle = 0; angle < Math.PI * 2; angle += 0.02) {
      const x = centerX + Math.cos(angle + this.rotation * 1.5) * cloudRadius;
      const y = centerY + Math.sin(angle) * cloudRadius;
      
      const noiseValue = (this.noiseService.perlin2D(
        angle * 5 + this.rotation * 2,
        0
      ) + 1) / 2;
      
      if (noiseValue > 0.65) {
        const cloudOpacity = (noiseValue - 0.65) / 0.35 * 0.3;
        const cloudSize = noiseValue * 15 + 5;
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, cloudSize);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${cloudOpacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, cloudSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
  }

  private renderMiniMap(): void {
    if (!this.miniMapCanvas) return;
    
    const canvas = this.miniMapCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);
    
    this.noiseService.setSeed(this.config.seed);
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const nx = (x / width) * this.config.scale * 2;
        const ny = (y / height) * this.config.scale;
        
        const noiseValue = (this.noiseService.fbm(
          nx,
          ny,
          this.config.octaves,
          this.config.persistence,
          this.config.lacunarity
        ) + 1) / 2;
        
        const color = this.getTerrainColor(noiseValue);
        
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  regenerate(): void {
    this.config.seed = Math.floor(Math.random() * 100000);
    this.noiseService.setSeed(this.config.seed);
    this.renderPlanet();
    this.renderMiniMap();
  }
}
