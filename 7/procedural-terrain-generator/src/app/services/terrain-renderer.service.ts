import { Injectable } from '@angular/core';
import { TerrainChunk, TerrainParams } from './terrain-generator.service';

@Injectable({
  providedIn: 'root'
})
export class TerrainRendererService {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private viewOffsetX: number = 0;
  private viewOffsetY: number = 0;
  private zoom: number = 1;
  private chunkSize: number = 50;
  private loadedChunks: Map<string, TerrainChunk> = new Map();

  init(canvas: HTMLCanvasElement): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas(): void {
    this.canvas.width = this.canvas.offsetWidth * window.devicePixelRatio;
    this.canvas.height = this.canvas.offsetHeight * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  render(
    terrainParams: TerrainParams,
    offsetX: number,
    offsetY: number,
    zoomLevel: number
  ): void {
    this.viewOffsetX = offsetX;
    this.viewOffsetY = offsetY;
    this.zoom = zoomLevel;

    this.ctx.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.loadAndRenderChunks(terrainParams);
  }

  private loadAndRenderChunks(terrainParams: TerrainParams): void {
    const visibleChunks = this.getVisibleChunks();

    for (const chunkKey of visibleChunks) {
      const [chunkX, chunkZ] = chunkKey.split(',').map(Number);
      this.renderChunk(chunkX, chunkZ, terrainParams);
    }
  }

  private getVisibleChunks(): string[] {
    const chunks: string[] = [];
    const pixelPerUnit = this.zoom;

    const startX = Math.floor((this.viewOffsetX - this.canvas.offsetWidth / 2) / (this.chunkSize * pixelPerUnit));
    const endX = Math.ceil((this.viewOffsetX + this.canvas.offsetWidth / 2) / (this.chunkSize * pixelPerUnit));
    const startZ = Math.floor((this.viewOffsetY - this.canvas.offsetHeight / 2) / (this.chunkSize * pixelPerUnit));
    const endZ = Math.ceil((this.viewOffsetY + this.canvas.offsetHeight / 2) / (this.chunkSize * pixelPerUnit));

    for (let x = startX - 1; x <= endX + 1; x++) {
      for (let z = startZ - 1; z <= endZ + 1; z++) {
        chunks.push(`${x},${z}`);
      }
    }

    return chunks;
  }

  private renderChunk(
    chunkX: number,
    chunkZ: number,
    terrainParams: TerrainParams
  ): void {
    const chunkKey = `${chunkX},${chunkZ}`;

    if (!this.loadedChunks.has(chunkKey)) {
      return;
    }

    const chunk = this.loadedChunks.get(chunkKey)!;
    const pixelPerUnit = this.zoom;

    const baseX = chunkX * this.chunkSize * pixelPerUnit - this.viewOffsetX + this.canvas.offsetWidth / 2;
    const baseZ = chunkZ * this.chunkSize * pixelPerUnit - this.viewOffsetY + this.canvas.offsetHeight / 2;

    const cellSize = pixelPerUnit;

    for (let z = 0; z < chunk.size; z++) {
      for (let x = 0; x < chunk.size; x++) {
        const screenX = baseX + x * cellSize;
        const screenZ = baseZ + z * cellSize;

        if (screenX + cellSize < 0 || screenX > this.canvas.offsetWidth ||
            screenZ + cellSize < 0 || screenZ > this.canvas.offsetHeight) {
          continue;
        }

        const color = chunk.colors[z][x];
        this.ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        this.ctx.fillRect(screenX, screenZ, Math.ceil(cellSize), Math.ceil(cellSize));
      }
    }
  }

  setLoadedChunks(chunks: TerrainChunk[]): void {
    this.loadedChunks.clear();
    for (const chunk of chunks) {
      this.loadedChunks.set(`${chunk.x},${chunk.z}`, chunk);
    }
  }

  getChunkSize(): number {
    return this.chunkSize;
  }

  getVisibleChunkRange(): { minX: number; maxX: number; minZ: number; maxZ: number } {
    const pixelPerUnit = this.zoom;

    const startX = Math.floor((this.viewOffsetX - this.canvas.offsetWidth / 2) / (this.chunkSize * pixelPerUnit));
    const endX = Math.ceil((this.viewOffsetX + this.canvas.offsetWidth / 2) / (this.chunkSize * pixelPerUnit));
    const startZ = Math.floor((this.viewOffsetY - this.canvas.offsetHeight / 2) / (this.chunkSize * pixelPerUnit));
    const endZ = Math.ceil((this.viewOffsetY + this.canvas.offsetHeight / 2) / (this.chunkSize * pixelPerUnit));

    return {
      minX: startX - 1,
      maxX: endX + 1,
      minZ: startZ - 1,
      maxZ: endZ + 1
    };
  }
}
