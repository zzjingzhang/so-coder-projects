import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanvasImage, CanvasBackground } from '../../services/canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @Input() images: CanvasImage[] = [];
  @Input() background: CanvasBackground | null = null;
  @Input() width = 800;
  @Input() height = 600;

  @Output() imageUpdated = new EventEmitter<CanvasImage>();
  @Output() imageRemoved = new EventEmitter<string>();
  @Output() exportCanvas = new EventEmitter<string>();

  @ViewChild('canvasContainer') canvasContainer!: ElementRef;
  @ViewChild('exportCanvas') exportCanvasRef!: ElementRef<HTMLCanvasElement>;

  selectedImageId: string | null = null;
  isDragging = false;
  isResizing = false;
  isRotating = false;
  dragStartX = 0;
  dragStartY = 0;
  imageStartX = 0;
  imageStartY = 0;
  imageStartWidth = 0;
  imageStartHeight = 0;
  imageStartRotation = 0;
  resizeHandle = '';
  maxZIndex = 1000;

  ngAfterViewInit(): void {
    this.updateMaxZIndex();
  }

  updateMaxZIndex(): void {
    if (this.images.length > 0) {
      this.maxZIndex = Math.max(...this.images.map(img => img.zIndex), 1000) + 1;
    }
  }

  onCanvasDrop(event: DragEvent): void {
    event.preventDefault();
    const dragUrl = event.dataTransfer?.getData('text/uri-list') || '';
    if (dragUrl && this.selectedImageId === null) {
      const image: CanvasImage = {
        id: 'img_' + Date.now(),
        src: dragUrl,
        x: event.offsetX - 100,
        y: event.offsetY - 75,
        width: 200,
        height: 150,
        rotation: 0,
        zIndex: this.maxZIndex++
      };
      this.imageUpdated.emit(image);
    }
  }

  onCanvasDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  selectImage(image: CanvasImage, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedImageId = image.id;
    image.zIndex = this.maxZIndex++;
    this.imageUpdated.emit({ ...image });
  }

  deselectImage(): void {
    this.selectedImageId = null;
  }

  onImageMouseDown(event: MouseEvent, image: CanvasImage, action: string): void {
    event.stopPropagation();
    this.selectImage(image, event);

    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.imageStartX = image.x;
    this.imageStartY = image.y;
    this.imageStartWidth = image.width;
    this.imageStartHeight = image.height;
    this.imageStartRotation = image.rotation;

    if (action === 'move') {
      this.isDragging = true;
    } else if (action === 'resize') {
      this.isResizing = true;
      this.resizeHandle = (event.target as HTMLElement).className.includes('nw') ? 'nw' :
                          (event.target as HTMLElement).className.includes('ne') ? 'ne' :
                          (event.target as HTMLElement).className.includes('sw') ? 'sw' : 'se';
    } else if (action === 'rotate') {
      this.isRotating = true;
    }

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (!this.selectedImageId) return;
    const image = this.images.find(img => img.id === this.selectedImageId);
    if (!image) return;

    const deltaX = event.clientX - this.dragStartX;
    const deltaY = event.clientY - this.dragStartY;

    if (this.isDragging) {
      image.x = this.imageStartX + deltaX;
      image.y = this.imageStartY + deltaY;
    } else if (this.isResizing) {
      const scale = this.width / this.canvasContainer.nativeElement.offsetWidth;
      const scaledDeltaX = deltaX * scale;
      const scaledDeltaY = deltaY * scale;

      if (this.resizeHandle.includes('e')) {
        image.width = Math.max(50, this.imageStartWidth + scaledDeltaX);
      }
      if (this.resizeHandle.includes('w')) {
        image.width = Math.max(50, this.imageStartWidth - scaledDeltaX);
        image.x = this.imageStartX + scaledDeltaX;
      }
      if (this.resizeHandle.includes('s')) {
        image.height = Math.max(50, this.imageStartHeight + scaledDeltaY);
      }
      if (this.resizeHandle.includes('n')) {
        image.height = Math.max(50, this.imageStartHeight - scaledDeltaY);
        image.y = this.imageStartY + scaledDeltaY;
      }
    } else if (this.isRotating) {
      const rect = this.canvasContainer.nativeElement.getBoundingClientRect();
      const centerX = rect.left + (image.x + image.width / 2);
      const centerY = rect.top + (image.y + image.height / 2);
      const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
      image.rotation = (angle * 180 / Math.PI) + 90;
    }

    this.imageUpdated.emit({ ...image });
  }

  onMouseUp = (): void => {
    this.isDragging = false;
    this.isResizing = false;
    this.isRotating = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  deleteImage(imageId: string): void {
    this.imageRemoved.emit(imageId);
    if (this.selectedImageId === imageId) {
      this.selectedImageId = null;
    }
  }

  exportAsPng(): void {
    const canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.background) {
      const bgImg = new Image();
      bgImg.crossOrigin = 'anonymous';
      bgImg.onload = () => {
        ctx.drawImage(bgImg, 0, 0, this.width, this.height);
        this.drawImagesToCanvas(ctx, canvas);
      };
      bgImg.src = this.background.src;
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, this.width, this.height);
      this.drawImagesToCanvas(ctx, canvas);
    }
  }

  private drawImagesToCanvas(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const sortedImages = [...this.images].sort((a, b) => a.zIndex - b.zIndex);
    let pendingImages = sortedImages.length;

    if (pendingImages === 0) {
      this.exportCanvas.emit(canvas.toDataURL('image/png'));
      return;
    }

    sortedImages.forEach(img => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        ctx.save();
        const centerX = img.x + img.width / 2;
        const centerY = img.y + img.height / 2;
        ctx.translate(centerX, centerY);
        ctx.rotate(img.rotation * Math.PI / 180);
        ctx.drawImage(image, -img.width / 2, -img.height / 2, img.width, img.height);
        ctx.restore();
        pendingImages--;
        if (pendingImages === 0) {
          this.exportCanvas.emit(canvas.toDataURL('image/png'));
        }
      };
      image.onerror = () => {
        pendingImages--;
        if (pendingImages === 0) {
          this.exportCanvas.emit(canvas.toDataURL('image/png'));
        }
      };
      image.src = img.src;
    });
  }
}
