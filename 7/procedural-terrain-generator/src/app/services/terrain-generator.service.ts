import { Injectable } from '@angular/core';
import { createNoise2D } from 'simplex-noise';

export interface TerrainParams {
  heightScale: number;
  roughness: number;
  textureBlend: number;
  seed: number;
}

export interface TerrainChunk {
  x: number;
  z: number;
  size: number;
  heights: number[][];
  colors: number[][][];
}

@Injectable({
  providedIn: 'root'
})
export class TerrainGeneratorService {
  private noise2D: ReturnType<typeof createNoise2D>;

  constructor() {
    this.noise2D = createNoise2D();
  }

  generateTerrainChunk(
    chunkX: number,
    chunkZ: number,
    chunkSize: number,
    params: TerrainParams
  ): TerrainChunk {
    const heights: number[][] = [];
    const colors: number[][][] = [];

    for (let z = 0; z <= chunkSize; z++) {
      heights[z] = [];
      colors[z] = [];
      for (let x = 0; x <= chunkSize; x++) {
        const worldX = chunkX * chunkSize + x;
        const worldZ = chunkZ * chunkSize + z;

        const height = this.calculateHeight(worldX, worldZ, params);
        heights[z][x] = height;

        const color = this.calculateColor(height, params);
        colors[z][x] = color;
      }
    }

    return {
      x: chunkX,
      z: chunkZ,
      size: chunkSize,
      heights,
      colors
    };
  }

  private calculateHeight(x: number, z: number, params: TerrainParams): number {
    let amplitude = 1;
    let frequency = 1;
    let height = 0;
    let maxAmplitude = 0;

    const octaves = 6;

    for (let i = 0; i < octaves; i++) {
      const sampleX = (x + params.seed) * 0.01 * frequency * params.roughness;
      const sampleZ = (z + params.seed) * 0.01 * frequency * params.roughness;

      const noiseValue = this.noise2D(sampleX, sampleZ);
      height += noiseValue * amplitude;

      maxAmplitude += amplitude;
      amplitude *= 0.5;
      frequency *= 2;
    }

    height = ((height / maxAmplitude) + 1) / 2;
    return height * params.heightScale;
  }

  private calculateColor(height: number, params: TerrainParams): number[] {
    const normalizedHeight = height / params.heightScale;

    const waterLevel = 0.3;
    const sandLevel = 0.35;
    const grassLevel = 0.6;
    const forestLevel = 0.75;
    const rockLevel = 0.9;

    let color: number[];

    if (normalizedHeight < waterLevel) {
      const t = normalizedHeight / waterLevel;
      color = this.lerpColor([20, 50, 120], [40, 80, 160], t);
    } else if (normalizedHeight < sandLevel) {
      const t = (normalizedHeight - waterLevel) / (sandLevel - waterLevel);
      color = this.lerpColor([40, 80, 160], [210, 190, 140], t);
    } else if (normalizedHeight < grassLevel) {
      const t = (normalizedHeight - sandLevel) / (grassLevel - sandLevel);
      color = this.lerpColor([210, 190, 140], [34, 139, 34], t);
    } else if (normalizedHeight < forestLevel) {
      const t = (normalizedHeight - grassLevel) / (forestLevel - grassLevel);
      color = this.lerpColor([34, 139, 34], [20, 80, 20], t);
    } else if (normalizedHeight < rockLevel) {
      const t = (normalizedHeight - forestLevel) / (rockLevel - forestLevel);
      color = this.lerpColor([20, 80, 20], [139, 137, 137], t);
    } else {
      const t = (normalizedHeight - rockLevel) / (1 - rockLevel);
      color = this.lerpColor([139, 137, 137], [255, 255, 255], t);
    }

    return this.blendTextures(color, normalizedHeight, params.textureBlend);
  }

  private lerpColor(color1: number[], color2: number[], t: number): number[] {
    return [
      Math.round(color1[0] + (color2[0] - color1[0]) * t),
      Math.round(color1[1] + (color2[1] - color1[1]) * t),
      Math.round(color1[2] + (color2[2] - color1[2]) * t)
    ];
  }

  private blendTextures(color: number[], height: number, blendFactor: number): number[] {
    const noise = createNoise2D();
    const variation = noise(height * 10, height * 10) * blendFactor * 20;

    return [
      Math.max(0, Math.min(255, Math.round(color[0] + variation))),
      Math.max(0, Math.min(255, Math.round(color[1] + variation))),
      Math.max(0, Math.min(255, Math.round(color[2] + variation)))
    ];
  }
}
