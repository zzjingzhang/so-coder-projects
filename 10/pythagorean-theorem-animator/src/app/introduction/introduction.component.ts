import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzStepsModule
  ],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.css'
})
export class IntroductionComponent {
  currentStep = 0;
  steps = [
    {
      title: '什么是直角三角形',
      content: '直角三角形是指有一个内角为90度（直角）的三角形。在直角三角形中，直角所对的边称为斜边（hypotenuse），其余两边称为直角边（legs）。'
    },
    {
      title: '直角三角形的特性',
      content: '1. 斜边是直角三角形中最长的边。\n2. 两个直角边的长度可以不同，也可以相同（等腰直角三角形）。\n3. 两个锐角之和为90度。'
    },
    {
      title: '勾股定理简介',
      content: '勾股定理是古希腊数学家毕达哥拉斯发现的一个重要几何定理，它描述了直角三角形三边之间的关系。定理指出：在直角三角形中，两条直角边的平方和等于斜边的平方。'
    },
    {
      title: '数学表达',
      content: '如果我们用a和b表示两条直角边的长度，用c表示斜边的长度，那么勾股定理可以表示为：\n\n\ta² + b² = c²\n\n这就是著名的勾股定理公式，它是整个几何学中最重要的定理之一。'
    }
  ];

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(index: number) {
    this.currentStep = index;
  }
}
