import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  name: string;
  points: Point[];
  color: string;
}

export interface TransformState {
  rotation: number;
  translateX: number;
  translateY: number;
  rotationCenter: Point;
  shape: Shape;
  timestamp: number;
}

@Component({
  selector: 'app-geometry-transformer',
  templateUrl: './geometry-transformer.component.html',
  standalone: false,
  styleUrl: './geometry-transformer.component.css'
})
export class GeometryTransformerComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  
  shapeForm!: FormGroup;
  transformForm!: FormGroup;
  
  predefinedShapes: Shape[] = [];
  selectedShape: Shape | null = null;
  currentRotation = 0;
  currentTranslateX = 0;
  currentTranslateY = 0;
  rotationCenter: Point = { x: 0, y: 0 };
  centerOptions: string[] = ['图形中心', '左上角', '右上角', '左下角', '右下角', '自定义'];
  selectedCenterOption = '图形中心';
  customCenter: Point = { x: 0, y: 0 };
  
  transformHistory: TransformState[] = [];
  showTrail = true;
  trailOpacity = 0.3;
  
  isCustomShapeMode = false;
  customShapePoints: Point[] = [];
  
  canvasWidth = 600;
  canvasHeight = 500;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initPredefinedShapes();
    this.initForms();
    this.initCanvas();
    this.selectedShape = this.predefinedShapes[0];
    this.updateRotationCenter();
    this.draw();
  }
  
  private initPredefinedShapes(): void {
    const size = 80;
    const centerX = this.canvasWidth / 2;
    const centerY = this.canvasHeight / 2;
    
    this.predefinedShapes = [
      {
        name: '三角形',
        points: [
          { x: centerX, y: centerY - size },
          { x: centerX - size, y: centerY + size },
          { x: centerX + size, y: centerY + size }
        ],
        color: '#3F51B5'
      },
      {
        name: '矩形',
        points: [
          { x: centerX - size, y: centerY - size * 0.6 },
          { x: centerX + size, y: centerY - size * 0.6 },
          { x: centerX + size, y: centerY + size * 0.6 },
          { x: centerX - size, y: centerY + size * 0.6 }
        ],
        color: '#E91E63'
      },
      {
        name: '正方形',
        points: [
          { x: centerX - size * 0.7, y: centerY - size * 0.7 },
          { x: centerX + size * 0.7, y: centerY - size * 0.7 },
          { x: centerX + size * 0.7, y: centerY + size * 0.7 },
          { x: centerX - size * 0.7, y: centerY + size * 0.7 }
        ],
        color: '#009688'
      },
      {
        name: '五边形',
        points: this.createPolygon(centerX, centerY, size, 5),
        color: '#FF9800'
      },
      {
        name: '六边形',
        points: this.createPolygon(centerX, centerY, size, 6),
        color: '#9C27B0'
      }
    ];
  }
  
  private createPolygon(centerX: number, centerY: number, radius: number, sides: number): Point[] {
    const points: Point[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI / sides) - Math.PI / 2;
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }
    return points;
  }
  
  private initForms(): void {
    this.shapeForm = this.fb.group({
      shape: ['三角形'],
      centerOption: ['图形中心']
    });
    
    this.transformForm = this.fb.group({
      rotation: [0],
      translateX: [0],
      translateY: [0]
    });
  }
  
  private initCanvas(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    canvasEl.width = this.canvasWidth;
    canvasEl.height = this.canvasHeight;
  }
  
  onShapeSelect(shapeName: string): void {
    const shape = this.predefinedShapes.find(s => s.name === shapeName);
    if (shape) {
      this.selectedShape = { ...shape, points: [...shape.points] };
      this.resetTransform();
      this.updateRotationCenter();
      this.clearHistory();
      this.isCustomShapeMode = false;
      this.draw();
    }
  }
  
  onCenterOptionChange(option: string): void {
    this.selectedCenterOption = option;
    this.updateRotationCenter();
    this.draw();
  }
  
  private updateRotationCenter(): void {
    if (!this.selectedShape) return;
    
    const points = this.selectedShape.points;
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    
    switch (this.selectedCenterOption) {
      case '图形中心':
        this.rotationCenter = { x: centerX, y: centerY };
        break;
      case '左上角':
        this.rotationCenter = { x: minX, y: minY };
        break;
      case '右上角':
        this.rotationCenter = { x: maxX, y: minY };
        break;
      case '左下角':
        this.rotationCenter = { x: minX, y: maxY };
        break;
      case '右下角':
        this.rotationCenter = { x: maxX, y: maxY };
        break;
      case '自定义':
        this.rotationCenter = { ...this.customCenter };
        break;
    }
  }
  
  onRotationChange(): void {
    this.draw();
  }
  
  onTranslateXChange(): void {
    this.draw();
  }
  
  onTranslateYChange(): void {
    this.draw();
  }
  
  translate(direction: 'up' | 'down' | 'left' | 'right'): void {
    const step = 20;
    switch (direction) {
      case 'up':
        this.currentTranslateY -= step;
        break;
      case 'down':
        this.currentTranslateY += step;
        break;
      case 'left':
        this.currentTranslateX -= step;
        break;
      case 'right':
        this.currentTranslateX += step;
        break;
    }
    this.transformForm.patchValue({
      translateX: this.currentTranslateX,
      translateY: this.currentTranslateY
    });
    this.draw();
  }
  
  rotate(degrees: number): void {
    this.currentRotation += degrees;
    if (this.currentRotation >= 360) this.currentRotation -= 360;
    if (this.currentRotation < 0) this.currentRotation += 360;
    this.transformForm.patchValue({ rotation: this.currentRotation });
    this.draw();
  }
  
  saveCurrentState(): void {
    if (!this.selectedShape) return;
    
    const state: TransformState = {
      rotation: this.currentRotation,
      translateX: this.currentTranslateX,
      translateY: this.currentTranslateY,
      rotationCenter: { ...this.rotationCenter },
      shape: { ...this.selectedShape, points: [...this.selectedShape.points] },
      timestamp: Date.now()
    };
    
    this.transformHistory.push(state);
    this.draw();
  }
  
  clearHistory(): void {
    this.transformHistory = [];
    this.draw();
  }
  
  resetTransform(): void {
    this.currentRotation = 0;
    this.currentTranslateX = 0;
    this.currentTranslateY = 0;
    this.transformForm.patchValue({
      rotation: 0,
      translateX: 0,
      translateY: 0
    });
    this.draw();
  }
  
  startCustomShape(): void {
    this.isCustomShapeMode = true;
    this.customShapePoints = [];
    this.selectedShape = null;
    this.resetTransform();
    this.clearHistory();
    this.draw();
  }
  
  cancelCustomShape(): void {
    this.isCustomShapeMode = false;
    this.customShapePoints = [];
    this.selectedShape = this.predefinedShapes[0];
    this.updateRotationCenter();
    this.draw();
  }
  
  onCanvasClick(event: MouseEvent): void {
    if (!this.isCustomShapeMode) return;
    
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    this.customShapePoints.push({ x, y });
    this.draw();
  }
  
  finishCustomShape(): void {
    if (this.customShapePoints.length < 3) {
      alert('自定义图形至少需要3个点！');
      return;
    }
    
    this.selectedShape = {
      name: '自定义图形',
      points: [...this.customShapePoints],
      color: '#673AB7'
    };
    
    this.isCustomShapeMode = false;
    this.customShapePoints = [];
    this.updateRotationCenter();
    this.draw();
  }
  
  draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    this.drawGrid();
    this.drawAxes();
    
    if (this.showTrail) {
      this.drawHistory();
    }
    
    if (this.isCustomShapeMode) {
      this.drawCustomShapePreview();
    } else if (this.selectedShape) {
      this.drawTransformedShape();
      this.drawRotationCenter();
    }
  }
  
  private drawGrid(): void {
    const ctx = this.ctx;
    const gridSize = 50;
    
    ctx.strokeStyle = '#E0E0E0';
    ctx.lineWidth = 1;
    
    for (let x = 0; x <= this.canvasWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.canvasHeight);
      ctx.stroke();
    }
    
    for (let y = 0; y <= this.canvasHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.canvasWidth, y);
      ctx.stroke();
    }
  }
  
  private drawAxes(): void {
    const ctx = this.ctx;
    const centerX = this.canvasWidth / 2;
    const centerY = this.canvasHeight / 2;
    
    ctx.strokeStyle = '#BDBDBD';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(this.canvasWidth, centerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, this.canvasHeight);
    ctx.stroke();
    
    ctx.fillStyle = '#757575';
    ctx.font = '12px Arial';
    ctx.fillText('O', centerX + 5, centerY - 5);
  }
  
  private drawHistory(): void {
    const ctx = this.ctx;
    
    this.transformHistory.forEach((state, index) => {
      const transformedPoints = this.applyTransform(
        state.shape.points,
        state.rotation,
        state.translateX,
        state.translateY,
        state.rotationCenter
      );
      
      ctx.globalAlpha = this.trailOpacity;
      ctx.fillStyle = state.shape.color;
      ctx.strokeStyle = state.shape.color;
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(transformedPoints[0].x, transformedPoints[0].y);
      for (let i = 1; i < transformedPoints.length; i++) {
        ctx.lineTo(transformedPoints[i].x, transformedPoints[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      
      ctx.globalAlpha = 1;
    });
  }
  
  private drawCustomShapePreview(): void {
    const ctx = this.ctx;
    
    if (this.customShapePoints.length > 0) {
      ctx.fillStyle = '#673AB7';
      ctx.strokeStyle = '#673AB7';
      ctx.lineWidth = 2;
      
      ctx.beginPath();
      ctx.moveTo(this.customShapePoints[0].x, this.customShapePoints[0].y);
      for (let i = 1; i < this.customShapePoints.length; i++) {
        ctx.lineTo(this.customShapePoints[i].x, this.customShapePoints[i].y);
      }
      
      if (this.customShapePoints.length >= 3) {
        ctx.closePath();
        ctx.globalAlpha = 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      ctx.stroke();
      
      this.customShapePoints.forEach((point, index) => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = index === 0 ? '#FF5722' : '#673AB7';
        ctx.fill();
      });
    }
  }
  
  private drawTransformedShape(): void {
    if (!this.selectedShape) return;
    
    const ctx = this.ctx;
    const transformedPoints = this.applyTransform(
      this.selectedShape.points,
      this.currentRotation,
      this.currentTranslateX,
      this.currentTranslateY,
      this.rotationCenter
    );
    
    ctx.fillStyle = this.selectedShape.color;
    ctx.strokeStyle = this.selectedShape.color;
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(transformedPoints[0].x, transformedPoints[0].y);
    for (let i = 1; i < transformedPoints.length; i++) {
      ctx.lineTo(transformedPoints[i].x, transformedPoints[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    transformedPoints.forEach(point => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      if (this.selectedShape) {
        ctx.strokeStyle = this.selectedShape.color;
      }
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  }
  
  private drawRotationCenter(): void {
    const ctx = this.ctx;
    const transformedCenter = this.applyTransformToPoint(
      this.rotationCenter,
      this.currentRotation,
      this.currentTranslateX,
      this.currentTranslateY,
      this.rotationCenter
    );
    
    ctx.beginPath();
    ctx.arc(transformedCenter.x, transformedCenter.y, 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#F44336';
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(transformedCenter.x, transformedCenter.y, 12, 0, 2 * Math.PI);
    ctx.strokeStyle = '#F44336';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(transformedCenter.x - 12, transformedCenter.y);
    ctx.lineTo(transformedCenter.x + 12, transformedCenter.y);
    ctx.moveTo(transformedCenter.x, transformedCenter.y - 12);
    ctx.lineTo(transformedCenter.x, transformedCenter.y + 12);
    ctx.strokeStyle = '#F44336';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  
  private applyTransform(
    points: Point[],
    rotation: number,
    translateX: number,
    translateY: number,
    center: Point
  ): Point[] {
    return points.map(point => 
      this.applyTransformToPoint(point, rotation, translateX, translateY, center)
    );
  }
  
  private applyTransformToPoint(
    point: Point,
    rotation: number,
    translateX: number,
    translateY: number,
    center: Point
  ): Point {
    const radians = (rotation * Math.PI) / 180;
    
    const translatedX = point.x - center.x;
    const translatedY = point.y - center.y;
    
    const rotatedX = translatedX * Math.cos(radians) - translatedY * Math.sin(radians);
    const rotatedY = translatedX * Math.sin(radians) + translatedY * Math.cos(radians);
    
    return {
      x: rotatedX + center.x + translateX,
      y: rotatedY + center.y + translateY
    };
  }
  
  onCustomCenterXChange(value: number): void {
    this.customCenter.x = value;
    this.updateRotationCenter();
    this.draw();
  }
  
  onCustomCenterYChange(value: number): void {
    this.customCenter.y = value;
    this.updateRotationCenter();
    this.draw();
  }
}
