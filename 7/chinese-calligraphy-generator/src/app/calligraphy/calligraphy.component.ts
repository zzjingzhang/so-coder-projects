import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface Stroke {
  points: { x: number; y: number; pressure: number }[];
  color: string;
  width: number;
}

interface Character {
  character: string;
  strokes: {
    points: { x: number; y: number }[];
    type: string;
  }[];
}

@Component({
  selector: 'app-calligraphy',
  standalone: false,
  templateUrl: './calligraphy.component.html',
  styleUrl: './calligraphy.component.css'
})
export class CalligraphyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationFrameId: number | null = null;
  private currentStrokeIndex = 0;
  private currentPointIndex = 0;
  isPlaying = false;

  layout = 'single';
  strokeSpeed = 50;
  inkColor = '#1a1a1a';
  gridSize = 2;
  inputText = '永';

  marks = {
    10: '慢',
    50: '中',
    100: '快'
  };

  presetCharacters: Character[] = [];

  inkColors = [
    { name: '墨黑', value: '#1a1a1a' },
    { name: '朱砂', value: '#c41e3a' },
    { name: '藏青', value: '#1e3a5f' },
    { name: '茶褐', value: '#6b4423' },
    { name: '金墨', value: '#d4af37' }
  ];

  layoutOptions = [
    { value: 'single', label: '单字展示' },
    { value: 'horizontal', label: '横向排列' },
    { value: 'vertical', label: '纵向排列' },
    { value: 'grid', label: '网格布局' }
  ];

  get currentCharacter(): Character | null {
    return this.presetCharacters[0] || null;
  }

  getCurrentLayoutLabel(): string {
    const option = this.layoutOptions.find(o => o.value === this.layout);
    return option ? option.label : '单字展示';
  }

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.initCanvas();
    this.initPresetCharacters();
    this.drawBackground();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 600;
    canvas.height = 600;
  }

  private initPresetCharacters(): void {
    this.presetCharacters = [this.createYongCharacter()];
  }

  private createYongCharacter(): Character {
    const centerX = 300;
    const centerY = 300;
    const scale = 80;

    return {
      character: '永',
      strokes: [
        {
          type: '点',
          points: [
            { x: centerX - 20, y: centerY - scale * 1.2 },
            { x: centerX - 10, y: centerY - scale * 1.15 },
            { x: centerX, y: centerY - scale * 1.1 },
            { x: centerX + 10, y: centerY - scale * 1.05 },
            { x: centerX + 15, y: centerY - scale }
          ]
        },
        {
          type: '横',
          points: [
            { x: centerX - scale * 0.8, y: centerY - scale * 0.6 },
            { x: centerX - scale * 0.4, y: centerY - scale * 0.62 },
            { x: centerX, y: centerY - scale * 0.6 },
            { x: centerX + scale * 0.4, y: centerY - scale * 0.58 },
            { x: centerX + scale * 0.8, y: centerY - scale * 0.6 }
          ]
        },
        {
          type: '竖',
          points: [
            { x: centerX, y: centerY - scale * 0.6 },
            { x: centerX - 2, y: centerY - scale * 0.3 },
            { x: centerX, y: centerY },
            { x: centerX + 2, y: centerY + scale * 0.3 },
            { x: centerX, y: centerY + scale * 0.6 }
          ]
        },
        {
          type: '撇',
          points: [
            { x: centerX, y: centerY - scale * 0.2 },
            { x: centerX - scale * 0.3, y: centerY + scale * 0.1 },
            { x: centerX - scale * 0.5, y: centerY + scale * 0.3 },
            { x: centerX - scale * 0.7, y: centerY + scale * 0.5 }
          ]
        },
        {
          type: '捺',
          points: [
            { x: centerX, y: centerY + scale * 0.1 },
            { x: centerX + scale * 0.3, y: centerY + scale * 0.3 },
            { x: centerX + scale * 0.5, y: centerY + scale * 0.5 },
            { x: centerX + scale * 0.8, y: centerY + scale * 0.7 }
          ]
        }
      ]
    };
  }

  private drawBackground(): void {
    const canvas = this.canvasRef.nativeElement;
    
    this.ctx.fillStyle = '#f5f5dc';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.ctx.strokeStyle = 'rgba(139, 119, 101, 0.3)';
    this.ctx.lineWidth = 1;

    const gridSize = canvas.width / 8;
    for (let i = 0; i <= 8; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * gridSize, 0);
      this.ctx.lineTo(i * gridSize, canvas.height);
      this.ctx.stroke();

      this.ctx.beginPath();
      this.ctx.moveTo(0, i * gridSize);
      this.ctx.lineTo(canvas.width, i * gridSize);
      this.ctx.stroke();
    }

    this.ctx.strokeStyle = 'rgba(139, 119, 101, 0.5)';
    this.ctx.setLineDash([10, 5]);
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(canvas.width, canvas.height);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(canvas.width, 0);
    this.ctx.lineTo(0, canvas.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    this.ctx.strokeStyle = 'rgba(139, 119, 101, 0.6)';
    this.ctx.lineWidth = 3;
    this.ctx.strokeRect(gridSize, gridSize, canvas.width - gridSize * 2, canvas.height - gridSize * 2);
  }

  startAnimation(): void {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.currentStrokeIndex = 0;
    this.currentPointIndex = 0;
    this.clearCanvas();
    this.animateStroke();
  }

  stopAnimation(): void {
    this.isPlaying = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  clearCanvas(): void {
    this.drawBackground();
    this.currentStrokeIndex = 0;
    this.currentPointIndex = 0;
  }

  private animateStroke(): void {
    if (!this.isPlaying || !this.currentCharacter) {
      this.isPlaying = false;
      return;
    }

    const character = this.currentCharacter;
    const stroke = character.strokes[this.currentStrokeIndex];

    if (!stroke) {
      this.isPlaying = false;
      return;
    }

    this.ctx.strokeStyle = this.inkColor;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';

    const speed = this.strokeSpeed;
    const delay = 100 - speed + 10;

    if (this.currentPointIndex < stroke.points.length - 1) {
      const startPoint = stroke.points[this.currentPointIndex];
      const endPoint = stroke.points[this.currentPointIndex + 1];

      this.drawBrushStroke(startPoint, endPoint);
      this.currentPointIndex++;

      this.animationFrameId = requestAnimationFrame(() => {
        setTimeout(() => this.animateStroke(), delay);
      });
    } else {
      this.currentStrokeIndex++;
      this.currentPointIndex = 0;

      if (this.currentStrokeIndex >= character.strokes.length) {
        this.isPlaying = false;
      } else {
        setTimeout(() => this.animateStroke(), delay * 2);
      }
    }
  }

  private drawBrushStroke(
    start: { x: number; y: number },
    end: { x: number; y: number }
  ): void {
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );
    
    const steps = Math.max(5, Math.floor(distance / 3));
    
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = start.x + (end.x - start.x) * t;
      const y = start.y + (end.y - start.y) * t;
      
      const baseWidth = 12;
      const pressure = 1 - Math.sin(t * Math.PI) * 0.3;
      const width = baseWidth * pressure;
      
      const alpha = 0.8 + Math.random() * 0.2;
      this.ctx.globalAlpha = alpha;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, width / 2, 0, Math.PI * 2);
      this.ctx.fillStyle = this.inkColor;
      this.ctx.fill();
      
      if (Math.random() > 0.7) {
        const splatterX = x + (Math.random() - 0.5) * width * 1.5;
        const splatterY = y + (Math.random() - 0.5) * width * 1.5;
        const splatterSize = width * 0.1 * Math.random();
        
        this.ctx.beginPath();
        this.ctx.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
    
    this.ctx.globalAlpha = 1;
  }

  onLayoutChange(): void {
    this.clearCanvas();
  }

  onColorChange(): void {
    this.clearCanvas();
  }

  onSpeedChange(): void {
  }
}
