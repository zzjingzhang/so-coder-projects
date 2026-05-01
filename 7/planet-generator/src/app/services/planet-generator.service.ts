import { Injectable } from '@angular/core';
import { createNoise2D } from 'simplex-noise';
import {
  PlanetParams,
  PlanetPixel,
  GeneratedPlanet,
  TerrainType,
  TerrainColor,
  TERRAIN_COLORS,
  DESERT_TERRAIN_COLORS,
  ICE_TERRAIN_COLORS,
  DEFAULT_PLANET_PARAMS
} from '../models/planet.models';

@Injectable({
  providedIn: 'root'
})
export class PlanetGeneratorService {
  private noise2D: ReturnType<typeof createNoise2D>;
  private noise2D_2: ReturnType<typeof createNoise2D>;
  private noise2D_3: ReturnType<typeof createNoise2D>;

  constructor() {
    this.noise2D = createNoise2D();
    this.noise2D_2 = createNoise2D();
    this.noise2D_3 = createNoise2D();
  }

  generateRandomSeed(): number {
    return Math.floor(Math.random() * 1000000);
  }

  generatePlanet(params: PlanetParams, size: number = 300): GeneratedPlanet {
    const pixels: PlanetPixel[] = [];
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = params.radius;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius) {
          const pixel = this.generatePixel(x, y, dx, dy, distance, radius, params);
          pixels.push(pixel);
        }
      }
    }

    return {
      params: { ...params },
      pixels,
      width: size,
      height: size
    };
  }

  private generatePixel(
    x: number,
    y: number,
    dx: number,
    dy: number,
    distance: number,
    radius: number,
    params: PlanetParams
  ): PlanetPixel {
    const normalizedDistance = distance / radius;
    const angle = Math.atan2(dy, dx);

    const height = this.generateHeight(angle, normalizedDistance, params);
    const terrainColors = this.getTerrainColors(params);
    const terrainType = this.getTerrainType(height, terrainColors);
    const color = this.calculateColor(height, terrainType, terrainColors, params);

    return {
      height,
      terrainType,
      color,
      x,
      y
    };
  }

  private generateHeight(angle: number, normalizedDistance: number, params: PlanetParams): number {
    const sampleX = Math.cos(angle) * normalizedDistance;
    const sampleY = Math.sin(angle) * normalizedDistance;

    let height = 0;
    let amplitude = 1;
    let frequency = 1;
    let maxAmplitude = 0;

    const octaves = 6;
    const roughness = params.terrainRoughness;
    const seed = params.seed;

    for (let i = 0; i < octaves; i++) {
      const noiseValue = this.noise2D(
        (sampleX + seed * 0.001) * frequency * roughness * 2,
        (sampleY + seed * 0.001) * frequency * roughness * 2
      );
      height += noiseValue * amplitude;
      maxAmplitude += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    height = ((height / maxAmplitude) + 1) / 2;

    if (params.temperature > 0.7) {
      height = this.applyDesertEffect(height, params);
    } else if (params.temperature < 0.3) {
      height = this.applyIceEffect(height, params);
    }

    return Math.max(0, Math.min(1, height));
  }

  private applyDesertEffect(height: number, params: PlanetParams): number {
    const desertFactor = (params.temperature - 0.5) * 2;
    const desertNoise = this.noise2D_2(height * 10, params.seed * 0.01);
    return height + desertNoise * 0.1 * desertFactor;
  }

  private applyIceEffect(height: number, params: PlanetParams): number {
    const iceFactor = (0.5 - params.temperature) * 2;
    const iceNoise = this.noise2D_3(height * 10, params.seed * 0.01);
    return Math.min(1, height + (1 - height) * 0.3 * iceFactor * (iceNoise * 0.5 + 0.5));
  }

  private getTerrainColors(params: PlanetParams): TerrainColor[] {
    if (params.temperature > 0.7) {
      return DESERT_TERRAIN_COLORS;
    } else if (params.temperature < 0.3) {
      return ICE_TERRAIN_COLORS;
    }
    return TERRAIN_COLORS;
  }

  private getTerrainType(height: number, terrainColors: TerrainColor[]): TerrainType {
    for (const terrain of terrainColors) {
      if (height >= terrain.minHeight && height < terrain.maxHeight) {
        return terrain.terrainType;
      }
    }
    return terrainColors[terrainColors.length - 1].terrainType;
  }

  private calculateColor(
    height: number,
    terrainType: TerrainType,
    terrainColors: TerrainColor[],
    params: PlanetParams
  ): number[] {
    const currentTerrain = terrainColors.find(t => t.terrainType === terrainType);
    if (!currentTerrain) {
      return [128, 128, 128];
    }

    let color = [...currentTerrain.color];

    const detailNoise = this.noise2D_2(height * 20 + params.seed, height * 20 + params.seed);
    const variation = detailNoise * 15;

    color = color.map(c => Math.max(0, Math.min(255, Math.round(c + variation))));

    if (params.humidity > 0.6 && terrainType === TerrainType.GRASSLAND) {
      color[1] = Math.min(255, color[1] + 20);
    } else if (params.humidity < 0.4 && terrainType === TerrainType.GRASSLAND) {
      color[0] = Math.min(255, color[0] + 20);
      color[1] = Math.max(0, color[1] - 10);
    }

    return color;
  }

  applyAtmosphere(
    canvas: HTMLCanvasElement,
    planet: GeneratedPlanet,
    params: PlanetParams
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = params.radius;

    if (params.atmosphereDensity <= 0) return;

    const atmosphereRadius = radius * (1 + params.atmosphereDensity * 0.3);
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius,
      centerX, centerY, atmosphereRadius
    );

    const color = params.atmosphereColor;
    const alpha = params.atmosphereDensity * 0.5;

    gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`);
    gradient.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, atmosphereRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = 'source-over';
  }

  applyShading(
    canvas: HTMLCanvasElement,
    params: PlanetParams
  ): void {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = params.radius;

    const lightAngle = Math.PI * 0.25;
    const lightDirX = Math.cos(lightAngle);
    const lightDirY = Math.sin(lightAngle);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const dx = x - centerX;
        const dy = y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= radius && distance > 0) {
          const nx = dx / radius;
          const ny = dy / radius;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));

          const lightIntensity = Math.max(0, nx * lightDirX + ny * lightDirY + nz * 0.5);
          const shading = 0.3 + lightIntensity * 0.7;

          const i = (y * canvas.width + x) * 4;
          data[i] = Math.min(255, Math.round(data[i] * shading));
          data[i + 1] = Math.min(255, Math.round(data[i + 1] * shading));
          data[i + 2] = Math.min(255, Math.round(data[i + 2] * shading));
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  createPreset(presetName: string): PlanetParams {
    const baseSeed = this.generateRandomSeed();
    
    switch (presetName.toLowerCase()) {
      case 'earth-like':
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed,
          waterLevel: 0.3,
          terrainRoughness: 1.0,
          temperature: 0.5,
          humidity: 0.6,
          atmosphereDensity: 0.3,
          atmosphereColor: [59, 130, 246],
          radius: 150
        };
      case 'mars-like':
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed,
          waterLevel: 0.05,
          terrainRoughness: 1.5,
          temperature: 0.8,
          humidity: 0.1,
          atmosphereDensity: 0.1,
          atmosphereColor: [239, 68, 68],
          radius: 130
        };
      case 'ice-world':
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed,
          waterLevel: 0.4,
          terrainRoughness: 0.8,
          temperature: 0.1,
          humidity: 0.3,
          atmosphereDensity: 0.4,
          atmosphereColor: [186, 230, 253],
          radius: 160
        };
      case 'desert-world':
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed,
          waterLevel: 0.1,
          terrainRoughness: 1.2,
          temperature: 0.9,
          humidity: 0.2,
          atmosphereDensity: 0.2,
          atmosphereColor: [251, 191, 36],
          radius: 140
        };
      case 'ocean-world':
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed,
          waterLevel: 0.8,
          terrainRoughness: 0.6,
          temperature: 0.6,
          humidity: 0.8,
          atmosphereDensity: 0.5,
          atmosphereColor: [14, 165, 233],
          radius: 170
        };
      default:
        return {
          ...DEFAULT_PLANET_PARAMS,
          seed: baseSeed
        };
    }
  }
}
