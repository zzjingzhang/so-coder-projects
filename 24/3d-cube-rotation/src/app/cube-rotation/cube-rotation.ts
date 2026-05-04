import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cube-rotation',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatSlider,
    MatSliderThumb,
    MatIcon,
    FormsModule
  ],
  templateUrl: './cube-rotation.html',
  styleUrl: './cube-rotation.css'
})
export class CubeRotationComponent {
  rotateX = signal(0);
  rotateY = signal(0);
  rotateZ = signal(0);
  isAutoRotating = signal(false);
  rotationSpeed = signal(1);
  
  private animationFrameId: number | null = null;

  toggleAutoRotation(): void {
    this.isAutoRotating.set(!this.isAutoRotating());
    
    if (this.isAutoRotating()) {
      this.startAutoRotation();
    } else {
      this.stopAutoRotation();
    }
  }

  private startAutoRotation(): void {
    const animate = () => {
      if (this.isAutoRotating()) {
        this.rotateX.update(val => (val + this.rotationSpeed()) % 360);
        this.rotateY.update(val => (val + this.rotationSpeed() * 1.5) % 360);
        this.animationFrameId = requestAnimationFrame(animate);
      }
    };
    this.animationFrameId = requestAnimationFrame(animate);
  }

  private stopAutoRotation(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  rotate(direction: string, angle: number = 90): void {
    if (this.isAutoRotating()) {
      this.toggleAutoRotation();
    }
    
    switch (direction) {
      case 'left':
        this.rotateY.update(val => (val - angle) % 360);
        break;
      case 'right':
        this.rotateY.update(val => (val + angle) % 360);
        break;
      case 'up':
        this.rotateX.update(val => (val - angle) % 360);
        break;
      case 'down':
        this.rotateX.update(val => (val + angle) % 360);
        break;
      case 'flip':
        this.rotateX.update(val => (val + 180) % 360);
        break;
    }
  }

  reset(): void {
    this.isAutoRotating.set(false);
    this.stopAutoRotation();
    this.rotateX.set(0);
    this.rotateY.set(0);
    this.rotateZ.set(0);
    this.rotationSpeed.set(1);
  }

  getCubeStyle(): { [key: string]: string } {
    return {
      transform: `rotateX(${this.rotateX()}deg) rotateY(${this.rotateY()}deg) rotateZ(${this.rotateZ()}deg)`
    };
  }
}
