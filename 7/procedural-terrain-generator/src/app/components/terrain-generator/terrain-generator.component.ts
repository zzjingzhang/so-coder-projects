import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TerrainGeneratorService, TerrainParams, TerrainChunk } from '../../services/terrain-generator.service';
import { TerrainRendererService } from '../../services/terrain-renderer.service';

@Component({
  selector: 'app-terrain-generator',
  templateUrl: './terrain-generator.component.html',
  styleUrls: ['./terrain-generator.component.css'],
  standalone: false
})
export class TerrainGeneratorComponent implements OnInit, AfterViewInit {
  @ViewChild('terrainCanvas') terrainCanvas!: ElementRef<HTMLCanvasElement>;

  terrainParams: TerrainParams = {
    heightScale: 100,
    roughness: 1.0,
    textureBlend: 0.5,
    seed: Math.floor(Math.random() * 10000)
  };

  viewOffsetX: number = 0;
  viewOffsetY: number = 0;
  zoomLevel: number = 2;

  private isDragging: boolean = false;
  private lastMouseX: number = 0;
  private lastMouseY: number = 0;

  constructor(
    private terrainGenerator: TerrainGeneratorService,
    private terrainRenderer: TerrainRendererService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.terrainRenderer.init(this.terrainCanvas.nativeElement);
    this.renderTerrain();
  }

  renderTerrain(): void {
    const chunkRange = this.terrainRenderer.getVisibleChunkRange();
    const chunkSize = this.terrainRenderer.getChunkSize();
    const chunks: TerrainChunk[] = [];

    for (let x = chunkRange.minX; x <= chunkRange.maxX; x++) {
      for (let z = chunkRange.minZ; z <= chunkRange.maxZ; z++) {
        const chunk = this.terrainGenerator.generateTerrainChunk(
          x,
          z,
          chunkSize,
          this.terrainParams
        );
        chunks.push(chunk);
      }
    }

    this.terrainRenderer.setLoadedChunks(chunks);
    this.terrainRenderer.render(
      this.terrainParams,
      this.viewOffsetX,
      this.viewOffsetY,
      this.zoomLevel
    );
  }

  onParamsChange(): void {
    this.renderTerrain();
  }

  regenerateSeed(): void {
    this.terrainParams.seed = Math.floor(Math.random() * 10000);
    this.renderTerrain();
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const deltaX = event.clientX - this.lastMouseX;
      const deltaY = event.clientY - this.lastMouseY;

      this.viewOffsetX -= deltaX / this.zoomLevel;
      this.viewOffsetY -= deltaY / this.zoomLevel;

      this.lastMouseX = event.clientX;
      this.lastMouseY = event.clientY;

      this.renderTerrain();
    }
  }

  onMouseUp(): void {
    this.isDragging = false;
  }

  onMouseLeave(): void {
    this.isDragging = false;
  }

  onWheel(event: WheelEvent): void {
    event.preventDefault();
    const zoomSpeed = 0.001;
    const zoomChange = -event.deltaY * zoomSpeed;
    this.zoomLevel = Math.max(0.5, Math.min(10, this.zoomLevel + zoomChange));
    this.renderTerrain();
  }

  resetView(): void {
    this.viewOffsetX = 0;
    this.viewOffsetY = 0;
    this.zoomLevel = 2;
    this.renderTerrain();
  }
}
