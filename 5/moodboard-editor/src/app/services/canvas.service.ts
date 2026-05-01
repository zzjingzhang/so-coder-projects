import { Injectable } from '@angular/core';

export interface CanvasImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

export interface CanvasBackground {
  src: string;
}

export interface CanvasState {
  images: CanvasImage[];
  background: CanvasBackground | null;
}

@Injectable({
  providedIn: 'root'
})
export class CanvasService {
  generateId(): string {
    return 'img_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  createImage(src: string, canvasWidth: number, canvasHeight: number): CanvasImage {
    return {
      id: this.generateId(),
      src,
      x: canvasWidth / 2 - 100,
      y: canvasHeight / 2 - 75,
      width: 200,
      height: 150,
      rotation: 0,
      zIndex: Date.now()
    };
  }
}
