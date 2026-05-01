import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { CanvasService, CanvasImage, CanvasBackground } from './services/canvas.service';
import { StorageService } from './services/storage.service';
import { CanvasComponent } from './components/canvas/canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas') canvasComponent!: CanvasComponent;

  images: CanvasImage[] = [];
  background: CanvasBackground | null = null;
  sidebarCollapsed = false;
  canvasWidth = 800;
  canvasHeight = 600;

  constructor(
    private canvasService: CanvasService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadFromStorage();
    this.updateCanvasSize();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.storageService.clearAll();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateCanvasSize();
  }

  updateCanvasSize(): void {
    const sidebarWidth = this.sidebarCollapsed ? 60 : 280;
    const maxWidth = window.innerWidth - sidebarWidth - 40;
    const maxHeight = window.innerHeight - 120;

    const aspectRatio = 4 / 3;
    let width = maxWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    this.canvasWidth = Math.min(width, 1200);
    this.canvasHeight = this.canvasWidth / aspectRatio;
  }

  loadFromStorage(): void {
    const saved = this.storageService.load();
    if (saved) {
      this.images = saved.images || [];
      this.background = saved.background || null;
    }
  }

  saveToStorage(): void {
    this.storageService.save({
      images: this.images,
      background: this.background
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    setTimeout(() => this.updateCanvasSize(), 300);
  }

  onImageAdded(image: CanvasImage): void {
    this.images = [...this.images, image];
    this.saveToStorage();
  }

  onImageUpdated(updatedImage: CanvasImage): void {
    this.images = this.images.map(img =>
      img.id === updatedImage.id ? updatedImage : img
    );
    this.saveToStorage();
  }

  onImageRemoved(imageId: string): void {
    this.images = this.images.filter(img => img.id !== imageId);
    this.saveToStorage();
  }

  onBackgroundChanged(bg: CanvasBackground | null): void {
    this.background = bg;
    this.saveToStorage();
  }

  onExportRequest(): void {
    if (this.canvasComponent) {
      this.canvasComponent.exportAsPng();
    }
  }

  onExportCanvas(dataUrl: string): void {
    const link = document.createElement('a');
    link.download = 'moodboard.png';
    link.href = dataUrl;
    link.click();
  }
}
