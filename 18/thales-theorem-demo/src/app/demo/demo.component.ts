import { Component, ElementRef, ViewChild, AfterViewInit, signal, HostListener } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatButtonModule, MatCardModule, FormsModule],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.css'
})
export class DemoComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  
  public radius = signal(150);
  public angle = signal(90);
  public pointCAngle = signal(90);
  public sliderValue = 150;
  private isDragging = false;
  private centerX = 0;
  private centerY = 0;

  ngAfterViewInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.sliderValue = this.radius();
    this.resizeCanvas();
    this.draw();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.resizeCanvas();
    this.draw();
  }

  private resizeCanvas(): void {
    const container = this.canvas.parentElement!;
    const size = Math.min(container.clientWidth - 40, 400);
    this.canvas.width = size;
    this.canvas.height = size / 2 + 50;
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height - 40;
  }

  public onRadiusChange(value: number): void {
    this.radius.set(Math.max(50, Math.min(180, value)));
    this.draw();
  }

  private getPointC(): { x: number; y: number } {
    const angleRad = (this.pointCAngle() * Math.PI) / 180;
    return {
      x: this.centerX + this.radius() * Math.cos(angleRad),
      y: this.centerY - this.radius() * Math.sin(angleRad)
    };
  }

  private getPointA(): { x: number; y: number } {
    return {
      x: this.centerX - this.radius(),
      y: this.centerY
    };
  }

  private getPointB(): { x: number; y: number } {
    return {
      x: this.centerX + this.radius(),
      y: this.centerY
    };
  }

  private calculateAngle(): number {
    const A = this.getPointA();
    const B = this.getPointB();
    const C = this.getPointC();

    const vectorCA = { x: A.x - C.x, y: A.y - C.y };
    const vectorCB = { x: B.x - C.x, y: B.y - C.y };

    const dotProduct = vectorCA.x * vectorCB.x + vectorCA.y * vectorCB.y;
    const magnitudeCA = Math.sqrt(vectorCA.x * vectorCA.x + vectorCA.y * vectorCA.y);
    const magnitudeCB = Math.sqrt(vectorCB.x * vectorCB.x + vectorCB.y * vectorCB.y);

    const cosAngle = dotProduct / (magnitudeCA * magnitudeCB);
    const angleRad = Math.acos(Math.max(-1, Math.min(1, cosAngle)));
    return (angleRad * 180) / Math.PI;
  }

  private draw(): void {
    if (!this.ctx) return;

    const A = this.getPointA();
    const B = this.getPointB();
    const C = this.getPointC();
    const O = { x: this.centerX, y: this.centerY };

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.beginPath();
    this.ctx.arc(O.x, O.y, this.radius(), Math.PI, 0, false);
    this.ctx.strokeStyle = '#3b82f6';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(A.x, A.y);
    this.ctx.lineTo(B.x, B.y);
    this.ctx.strokeStyle = '#10b981';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(A.x, A.y);
    this.ctx.lineTo(C.x, C.y);
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(B.x, B.y);
    this.ctx.lineTo(C.x, C.y);
    this.ctx.strokeStyle = '#ef4444';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.drawPoint(A, '#10b981', 'A');
    this.drawPoint(B, '#10b981', 'B');
    this.drawPoint(C, '#f59e0b', 'C');
    this.drawPoint(O, '#6366f1', 'O');

    this.drawAngleArc(C, A, B);

    this.angle.set(Math.round(this.calculateAngle() * 100) / 100);
  }

  private drawPoint(point: { x: number; y: number }, color: string, label: string): void {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
    this.ctx.fillStyle = color;
    this.ctx.fill();

    this.ctx.font = 'bold 14px Roboto';
    this.ctx.fillStyle = '#1f2937';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(label, point.x, point.y - 15);
  }

  private drawAngleArc(vertex: { x: number; y: number }, p1: { x: number; y: number }, p2: { x: number; y: number }): void {
    const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
    const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);

    this.ctx.beginPath();
    this.ctx.arc(vertex.x, vertex.y, 25, angle1, angle2, angle1 > angle2);
    this.ctx.strokeStyle = '#8b5cf6';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    const midAngle = (angle1 + angle2) / 2;
    const labelX = vertex.x + 40 * Math.cos(midAngle);
    const labelY = vertex.y + 40 * Math.sin(midAngle);

    this.ctx.font = 'bold 12px Roboto';
    this.ctx.fillStyle = '#8b5cf6';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(`${this.angle()}°`, labelX, labelY);
  }

  public onMouseDown(event: MouseEvent): void {
    if (this.isNearPointC(event)) {
      this.isDragging = true;
    }
  }

  public onMouseMove(event: MouseEvent): void {
    if (this.isDragging) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const dx = x - this.centerX;
      const dy = this.centerY - y;

      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angleDeg < 0) angleDeg += 180;
      angleDeg = Math.max(10, Math.min(170, angleDeg));

      this.pointCAngle.set(angleDeg);
      this.draw();
    }
  }

  public onMouseUp(): void {
    this.isDragging = false;
  }

  public onMouseLeave(): void {
    this.isDragging = false;
  }

  private isNearPointC(event: MouseEvent): boolean {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const C = this.getPointC();
    const distance = Math.sqrt((x - C.x) ** 2 + (y - C.y) ** 2);
    return distance < 20;
  }

  public onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    const touch = event.touches[0];
    if (this.isNearPointCFromTouch(touch)) {
      this.isDragging = true;
    }
  }

  public onTouchMove(event: TouchEvent): void {
    event.preventDefault();
    if (this.isDragging) {
      const touch = event.touches[0];
      const rect = this.canvas.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      const dx = x - this.centerX;
      const dy = this.centerY - y;

      let angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angleDeg < 0) angleDeg += 180;
      angleDeg = Math.max(10, Math.min(170, angleDeg));

      this.pointCAngle.set(angleDeg);
      this.draw();
    }
  }

  public onTouchEnd(): void {
    this.isDragging = false;
  }

  private isNearPointCFromTouch(touch: Touch): boolean {
    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const C = this.getPointC();
    const distance = Math.sqrt((x - C.x) ** 2 + (y - C.y) ** 2);
    return distance < 30;
  }

  public displayFn(value: number): string {
    return `${value}px`;
  }
}
