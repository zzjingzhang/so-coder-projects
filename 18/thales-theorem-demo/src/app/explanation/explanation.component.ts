import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explanation',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './explanation.component.html',
  styleUrl: './explanation.component.css'
})
export class ExplanationComponent {
  public currentStep = 0;

  public proofSteps = [
    {
      title: '步骤 1: 设定条件',
      content: '设AB为圆O的直径，点C为半圆上不同于A、B的任意一点。我们需要证明 ∠ACB = 90°。',
      formula: 'AB 是直径，O 是圆心，OA = OB = OC = r (半径)'
    },
    {
      title: '步骤 2: 连接辅助线',
      content: '连接OC。由于OC也是圆的半径，所以 OA = OB = OC = r。',
      formula: 'OA = OB = OC = r'
    },
    {
      title: '步骤 3: 分析三角形',
      content: '在△OAC中，OA = OC，所以这是一个等腰三角形。因此 ∠OAC = ∠OCA。设这两个角为 α。',
      formula: '∠OAC = ∠OCA = α'
    },
    {
      title: '步骤 4: 分析另一个三角形',
      content: '在△OBC中，OB = OC，所以这也是一个等腰三角形。因此 ∠OBC = ∠OCB。设这两个角为 β。',
      formula: '∠OBC = ∠OCB = β'
    },
    {
      title: '步骤 5: 利用三角形内角和',
      content: '在△ABC中，三个内角之和等于 180°。',
      formula: '∠BAC + ∠ABC + ∠ACB = 180°'
    },
    {
      title: '步骤 6: 代入角度',
      content: '代入已知的角度关系：∠BAC = α，∠ABC = β，∠ACB = α + β。',
      formula: 'α + β + (α + β) = 180°'
    },
    {
      title: '步骤 7: 化简方程',
      content: '化简上述方程，得到 2(α + β) = 180°，因此 α + β = 90°。',
      formula: '2(α + β) = 180° ⇒ α + β = 90°'
    },
    {
      title: '步骤 8: 得出结论',
      content: '由于 ∠ACB = α + β = 90°，所以 △ABC 是直角三角形，且直角在点C。',
      formula: '∠ACB = 90° ✓ 证毕'
    }
  ];

  public nextStep(): void {
    if (this.currentStep < this.proofSteps.length - 1) {
      this.currentStep++;
    }
  }

  public prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  public goToStep(step: number): void {
    this.currentStep = step;
  }
}
