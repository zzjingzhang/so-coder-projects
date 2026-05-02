import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formula',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzTabsModule,
    NzCollapseModule
  ],
  templateUrl: './formula.component.html',
  styleUrl: './formula.component.css'
})
export class FormulaComponent {
  activeTabIndex = 0;
  panels = [
    {
      active: false,
      name: '问题 1: 已知两条直角边，求斜边',
      content: `题目：在直角三角形中，已知直角边 a = 6，b = 8，求斜边 c 的长度。

解法：
根据勾股定理：c² = a² + b²

代入数值：
c² = 6² + 8²
c² = 36 + 64
c² = 100
c = √100
c = 10

答案：斜边 c 的长度是 10。`
    },
    {
      active: false,
      name: '问题 2: 已知斜边和一条直角边，求另一条直角边',
      content: `题目：在直角三角形中，已知斜边 c = 13，直角边 a = 5，求另一条直角边 b 的长度。

解法：
根据勾股定理的变形：b² = c² - a²

代入数值：
b² = 13² - 5²
b² = 169 - 25
b² = 144
b = √144
b = 12

答案：直角边 b 的长度是 12。`
    },
    {
      active: false,
      name: '问题 3: 验证三角形是否为直角三角形',
      content: `题目：一个三角形的三条边分别为 5、12、13，判断这个三角形是否为直角三角形。

解法：
根据勾股定理的逆定理：
如果 a² + b² = c²，则三角形为直角三角形。

验证：
5² + 12² = 25 + 144 = 169
13² = 169

因为 5² + 12² = 13²，所以这个三角形是直角三角形。

答案：这是一个直角三角形，斜边为 13。`
    }
  ];

  tabs = [
    {
      title: '基本公式',
      content: '勾股定理的基本形式是：a² + b² = c²\n\n其中：\n- a 和 b 是直角三角形的两条直角边\n- c 是直角三角形的斜边\n\n这个公式表明：两条直角边的平方和等于斜边的平方。'
    },
    {
      title: '公式变形',
      content: '根据基本公式，我们可以推导出以下变形形式：\n\n1. 求斜边：\n   c = √(a² + b²)\n\n2. 求直角边 a：\n   a = √(c² - b²)\n\n3. 求直角边 b：\n   b = √(c² - a²)\n\n这些变形公式在实际问题中非常有用。'
    },
    {
      title: '逆定理',
      content: '勾股定理的逆定理：\n\n如果一个三角形的三条边 a、b、c 满足关系式：\n\na² + b² = c²\n\n那么这个三角形是直角三角形，且边 c 所对的角为直角。\n\n应用：逆定理常用于验证一个三角形是否为直角三角形。'
    },
    {
      title: '常见勾股数',
      content: '勾股数是指满足勾股定理的三个正整数。以下是一些常见的勾股数：\n\n- (3, 4, 5) - 最经典的勾股数\n- (5, 12, 13)\n- (8, 15, 17)\n- (7, 24, 25)\n- (9, 40, 41)\n\n记忆这些勾股数可以帮助快速解决问题。'
    }
  ];
}
