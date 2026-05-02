import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animation',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzSliderModule,
    FormsModule
  ],
  templateUrl: './animation.component.html',
  styleUrl: './animation.component.css'
})
export class AnimationComponent implements OnInit, OnDestroy {
  currentStep = 0;
  isPlaying = false;
  animationSpeed = 2;
  animationInterval: any = null;
  
  // 三角形边长（使用经典的3-4-5三角形）
  a = 3;
  b = 4;
  c = 5;
  
  // SVG坐标
  scale = 60; // 缩放因子
  originX = 100;
  originY = 300;
  
  // 动画状态
  showSquareA = false;
  showSquareB = false;
  showSquareC = false;
  showAreaA = false;
  showAreaB = false;
  showAreaC = false;
  showProofAnimation = false;
  proofStep = 0;
  
  steps = [
    {
      title: '步骤 1: 认识直角三角形',
      description: '我们使用经典的 3-4-5 直角三角形来演示勾股定理。其中 a=3, b=4 是直角边，c=5 是斜边。'
    },
    {
      title: '步骤 2: 绘制直角边上的正方形',
      description: '在两条直角边上分别绘制正方形。边长为 a 的正方形面积是 a² = 9，边长为 b 的正方形面积是 b² = 16。'
    },
    {
      title: '步骤 3: 绘制斜边上的正方形',
      description: '在斜边上绘制正方形。边长为 c 的正方形面积是 c² = 25。'
    },
    {
      title: '步骤 4: 验证面积关系',
      description: '观察到：a² + b² = 9 + 16 = 25 = c²。这就是勾股定理的核心！'
    },
    {
      title: '步骤 5: 动态证明（面积重排）',
      description: '通过动画演示，我们可以看到斜边上的正方形面积确实等于两个直角边上正方形面积之和。'
    }
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  playAnimation(): void {
    this.isPlaying = true;
    this.resetAnimation();
    
    this.animationInterval = setInterval(() => {
      if (this.currentStep < this.steps.length - 1) {
        this.nextStep();
      } else {
        this.stopAnimation();
      }
    }, 3000 / this.animationSpeed);
  }

  stopAnimation(): void {
    this.isPlaying = false;
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
  }

  resetAnimation(): void {
    this.currentStep = 0;
    this.showSquareA = false;
    this.showSquareB = false;
    this.showSquareC = false;
    this.showAreaA = false;
    this.showAreaB = false;
    this.showAreaC = false;
    this.showProofAnimation = false;
    this.proofStep = 0;
    this.updateStepVisuals();
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateStepVisuals();
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updateStepVisuals();
    }
  }

  updateStepVisuals(): void {
    // 重置所有状态
    this.showSquareA = false;
    this.showSquareB = false;
    this.showSquareC = false;
    this.showAreaA = false;
    this.showAreaB = false;
    this.showAreaC = false;
    this.showProofAnimation = false;
    
    // 根据当前步骤设置状态
    if (this.currentStep >= 1) {
      this.showSquareA = true;
      this.showSquareB = true;
    }
    
    if (this.currentStep >= 2) {
      this.showSquareC = true;
    }
    
    if (this.currentStep >= 3) {
      this.showAreaA = true;
      this.showAreaB = true;
      this.showAreaC = true;
    }
    
    if (this.currentStep >= 4) {
      this.showProofAnimation = true;
      this.playProofAnimation();
    }
  }

  playProofAnimation(): void {
    this.proofStep = 0;
    const proofInterval = setInterval(() => {
      if (this.proofStep < 4) {
        this.proofStep++;
      } else {
        clearInterval(proofInterval);
      }
    }, 1000);
  }

  // 计算SVG坐标
  getTrianglePoints(): string {
    const x1 = this.originX;
    const y1 = this.originY;
    const x2 = this.originX + this.b * this.scale;
    const y2 = this.originY;
    const x3 = this.originX;
    const y3 = this.originY - this.a * this.scale;
    
    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
  }

  getSquareAPoints(): string {
    // 以 a 为边的正方形（垂直方向）
    const x1 = this.originX;
    const y1 = this.originY - this.a * this.scale;
    const x2 = this.originX - this.a * this.scale;
    const y2 = this.originY - this.a * this.scale;
    const x3 = this.originX - this.a * this.scale;
    const y3 = this.originY;
    const x4 = this.originX;
    const y4 = this.originY;
    
    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  }

  getSquareBPoints(): string {
    // 以 b 为边的正方形（水平方向）
    const x1 = this.originX;
    const y1 = this.originY;
    const x2 = this.originX + this.b * this.scale;
    const y2 = this.originY;
    const x3 = this.originX + this.b * this.scale;
    const y3 = this.originY + this.b * this.scale;
    const x4 = this.originX;
    const y4 = this.originY + this.b * this.scale;
    
    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  }

  getSquareCPoints(): string {
    // 以 c 为边的正方形（斜边方向）
    // 使用旋转矩阵计算正方形顶点
    const angle = Math.atan2(this.a, this.b);
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    const x1 = this.originX + this.b * this.scale;
    const y1 = this.originY;
    const x2 = this.originX;
    const y2 = this.originY - this.a * this.scale;
    
    // 计算另外两个顶点
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.sqrt(dx * dx + dy * dy);
    const unitX = dx / len;
    const unitY = dy / len;
    
    // 垂直方向的单位向量（逆时针旋转90度）
    const perpX = -unitY;
    const perpY = unitX;
    
    const x3 = x2 + perpX * len;
    const y3 = y2 + perpY * len;
    const x4 = x1 + perpX * len;
    const y4 = y1 + perpY * len;
    
    return `${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`;
  }

  getAreaA(): number {
    return this.a * this.a;
  }

  getAreaB(): number {
    return this.b * this.b;
  }

  getAreaC(): number {
    return this.c * this.c;
  }
}
