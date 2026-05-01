import { Component, OnInit, HostListener } from '@angular/core';

interface Topping {
  id: number;
  type: 'pepperoni' | 'mushroom' | 'olive' | 'pepper' | 'basil';
  x: number;
  y: number;
  rotation: number;
  isFlying: boolean;
  flyX: number;
  flyY: number;
  flyRotation: number;
}

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css'],
  standalone: false
})
export class PizzaComponent implements OnInit {
  rotation: number = 0;
  angularVelocity: number = 0;
  isDragging: boolean = false;
  lastMouseX: number = 0;
  lastMouseY: number = 0;
  centerX: number = 0;
  centerY: number = 0;
  lastAngle: number = 0;
  toppings: Topping[] = [];
  maxSpeed: number = 15;
  flyThreshold: number = 8;

  ngOnInit(): void {
    this.initializeToppings();
  }

  initializeToppings(): void {
    const toppingTypes: ('pepperoni' | 'mushroom' | 'olive' | 'pepper' | 'basil')[] = 
      ['pepperoni', 'mushroom', 'olive', 'pepper', 'basil'];
    
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 30 + Math.random() * 50;
      this.toppings.push({
        id: i,
        type: toppingTypes[i % toppingTypes.length],
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotation: Math.random() * 360,
        isFlying: false,
        flyX: 0,
        flyY: 0,
        flyRotation: 0
      });
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    const pizzaElement = event.currentTarget as HTMLElement;
    const rect = pizzaElement.getBoundingClientRect();
    this.centerX = rect.left + rect.width / 2;
    this.centerY = rect.top + rect.height / 2;
    
    this.isDragging = true;
    this.lastMouseX = event.clientX;
    this.lastMouseY = event.clientY;
    this.lastAngle = Math.atan2(event.clientY - this.centerY, event.clientX - this.centerX);
    this.angularVelocity = 0;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    
    const currentAngle = Math.atan2(event.clientY - this.centerY, event.clientX - this.centerX);
    let angleDiff = currentAngle - this.lastAngle;
    
    if (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
    if (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
    
    const degreesDiff = angleDiff * (180 / Math.PI);
    this.rotation += degreesDiff;
    this.angularVelocity = degreesDiff;
    this.lastAngle = currentAngle;
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent): void {
    this.isDragging = false;
    this.startSpinning();
  }

  startSpinning(): void {
    const spinInterval = setInterval(() => {
      if (Math.abs(this.angularVelocity) < 0.1 && !this.isDragging) {
        clearInterval(spinInterval);
        return;
      }
      
      if (!this.isDragging) {
        this.rotation += this.angularVelocity;
        this.angularVelocity *= 0.98;
        
        this.checkToppingsFly();
      }
    }, 16);
  }

  checkToppingsFly(): void {
    const speed = Math.abs(this.angularVelocity);
    
    if (speed > this.flyThreshold) {
      this.toppings.forEach(topping => {
        if (!topping.isFlying && Math.random() < 0.1) {
          topping.isFlying = true;
          const angle = Math.atan2(topping.y, topping.x);
          const flySpeed = 5 + Math.random() * 10;
          topping.flyX = Math.cos(angle) * flySpeed;
          topping.flyY = Math.sin(angle) * flySpeed;
          topping.flyRotation = (Math.random() - 0.5) * 20;
          this.flyTopping(topping);
        }
      });
    }
  }

  flyTopping(topping: Topping): void {
    const flyInterval = setInterval(() => {
      topping.x += topping.flyX;
      topping.y += topping.flyY + 2;
      topping.flyY += 0.5;
      topping.rotation += topping.flyRotation;
      
      if (Math.abs(topping.x) > 300 || Math.abs(topping.y) > 300) {
        clearInterval(flyInterval);
      }
    }, 16);
  }

  resetPizza(): void {
    this.rotation = 0;
    this.angularVelocity = 0;
    this.toppings = [];
    this.initializeToppings();
  }

  getToppingClass(type: string): string {
    switch (type) {
      case 'pepperoni': return 'pepperoni';
      case 'mushroom': return 'mushroom';
      case 'olive': return 'olive';
      case 'pepper': return 'pepper';
      case 'basil': return 'basil';
      default: return 'pepperoni';
    }
  }

  get absAngularVelocity(): number {
    return Math.abs(this.angularVelocity);
  }

  get formattedSpeed(): string {
    return Math.abs(this.angularVelocity).toFixed(1);
  }

  get isSpeedHigh(): boolean {
    return Math.abs(this.angularVelocity) > this.flyThreshold;
  }
}