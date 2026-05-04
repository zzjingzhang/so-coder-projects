import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  @ViewChild('cubeContainer') cubeContainer!: ElementRef;
  
  rotateX: number = -20;
  rotateY: number = 30;
  isDragging: boolean = false;
  lastMouseX: number = 0;
  lastMouseY: number = 0;

  get transform(): string {
    return `rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg)`;
  }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.clientX - this.lastMouseX;
    const deltaY = event.clientY - this.lastMouseY;

    this.rotateY += deltaX * 0.5;
    this.rotateX -= deltaY * 0.5;

    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isDragging = false;
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.lastMouseX = event.touches[0].clientX;
    this.lastMouseY = event.touches[0].clientY;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;

    const deltaX = event.touches[0].clientX - this.lastMouseX;
    const deltaY = event.touches[0].clientY - this.lastMouseY;

    this.rotateY += deltaX * 0.5;
    this.rotateX -= deltaY * 0.5;

    this.lastMouseX = event.touches[0].clientX;
    this.lastMouseY = event.touches[0].clientY;
  }

  @HostListener('document:touchend')
  onTouchEnd(): void {
    this.isDragging = false;
  }

  resetView(): void {
    this.rotateX = -20;
    this.rotateY = 30;
  }

  frontView(): void {
    this.rotateX = 0;
    this.rotateY = 0;
  }

  topView(): void {
    this.rotateX = -90;
    this.rotateY = 0;
  }

  sideView(): void {
    this.rotateX = 0;
    this.rotateY = -90;
  }
}
