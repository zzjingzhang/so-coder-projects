import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface Step {
  title: string;
  description: string;
  equation: string;
  detail: string;
}

interface Question {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-electrolysis-demo',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzStepsModule,
    NzCollapseModule,
    NzIconModule
  ],
  templateUrl: './electrolysis-demo.component.html',
  styleUrl: './electrolysis-demo.component.css'
})
export class ElectrolysisDemoComponent implements OnInit, OnDestroy {
  currentStep = 0;
  isPlaying = false;
  animationFrame: number | null = null;
  autoPlayTimeout: ReturnType<typeof setTimeout> | null = null;
  isBubblesActive = false;
  hydrogenBubbles: { id: number; x: number; y: number; size: number }[] = [];
  oxygenBubbles: { id: number; x: number; y: number; size: number }[] = [];
  bubbleId = 0;

  steps: Step[] = [
    {
      title: '准备阶段',
      description: '电解槽中装有水，并加入少量电解质（如稀硫酸或氢氧化钠）以增强导电性。两个电极（阴极和阳极）浸入水中，尚未接通电源。',
      equation: 'H₂O (液态) → 准备电解',
      detail: '纯水的导电性很弱，因此需要加入电解质使溶液能够导电。电解质在水中解离成离子，帮助电流通过溶液。'
    },
    {
      title: '接通电源',
      description: '接通直流电源，电流开始通过电解质溶液。电子从电源负极流出，经过导线到达阴极；同时电子从阳极流回电源正极。',
      equation: '直流电源 → 阴极(-) | 阳极(+)',
      detail: '电解水需要使用直流电（DC），而不是交流电（AC）。直流电使电子持续向一个方向流动，从而在两个电极上产生持续的化学反应。'
    },
    {
      title: '阴极反应（还原反应）',
      description: '在阴极（负极），水分子获得电子发生还原反应，产生氢气（H₂）。氢气以气泡形式从阴极表面逸出，向上漂浮。',
      equation: '2H₂O + 2e⁻ → H₂↑ + 2OH⁻',
      detail: '还原反应是指物质获得电子的反应。在阴极，每个水分子获得2个电子，分解成1个氢气分子和2个氢氧根离子。氢气的体积是氧气的2倍。'
    },
    {
      title: '阳极反应（氧化反应）',
      description: '在阳极（正极），水分子失去电子发生氧化反应，产生氧气（O₂）。氧气以气泡形式从阳极表面逸出，向上漂浮。',
      equation: '2H₂O → O₂↑ + 4H⁺ + 4e⁻',
      detail: '氧化反应是指物质失去电子的反应。在阳极，每2个水分子失去4个电子，分解成1个氧气分子和4个氢离子。注意：氧气的体积只有氢气的一半。'
    },
    {
      title: '总反应与结论',
      description: '电解水的总反应是2个水分子分解成2个氢气分子和1个氧气分子。氢气和氧气的体积比为2:1，这与水的化学式H₂O中氢原子和氧原子的比例一致。',
      equation: '2H₂O → 2H₂↑ + O₂↑',
      detail: '电解水实验证明了：1）水是由氢元素和氧元素组成的化合物；2）水分子由2个氢原子和1个氧原子构成；3）化学反应中分子可以再分，而原子不能再分。'
    }
  ];

  questions: Question[] = [
    {
      question: '为什么纯水不能直接电解，需要加入电解质？',
      answer: '纯水是极弱的电解质，在25°C时其电离常数Kw仅为10⁻¹⁴，因此纯水中自由移动的离子浓度极低（H⁺和OH⁻浓度各为10⁻⁷ mol/L），导电性很差。加入少量硫酸（H₂SO₄）或氢氧化钠（NaOH）等电解质后，这些物质在水中完全电离，产生大量自由移动的离子（如H⁺、SO₄²⁻或Na⁺、OH⁻），大大增强了溶液的导电性，使电解反应能够顺利进行。'
    },
    {
      question: '为什么氢气和氧气的体积比是2:1？',
      answer: '这是由水的化学式H₂O和电解反应的化学计量关系决定的。根据总反应方程式：2H₂O → 2H₂ + O₂，每电解2个水分子，产生2个氢气分子和1个氧气分子。在相同温度和压强下，气体的体积与分子数成正比（阿伏伽德罗定律）。因此，氢气和氧气的体积比等于它们的分子数比，即2:1。这也从侧面证明了水分子中氢原子和氧原子的个数比为2:1。'
    },
    {
      question: '阴极和阳极分别发生什么类型的反应？',
      answer: '阴极（连接电源负极）发生还原反应：水分子获得电子，被还原生成氢气。反应式：2H₂O + 2e⁻ → H₂↑ + 2OH⁻。阳极（连接电源正极）发生氧化反应：水分子失去电子，被氧化生成氧气。反应式：2H₂O → O₂↑ + 4H⁺ + 4e⁻。记忆口诀：\"阳氧阴还\"——阳极发生氧化反应，阴极发生还原反应。'
    },
    {
      question: '电解水是吸热反应还是放热反应？',
      answer: '电解水是吸热反应（需要持续输入能量）。与氢气燃烧生成水（放热反应）相反，电解水需要外界提供电能才能进行。从能量角度看：2H₂ + O₂ → 2H₂O + 能量（燃烧，放热）；2H₂O + 能量 → 2H₂ + O₂（电解，吸热）。电解水的过程是将电能转化为化学能，储存在生成的氢气和氧气中。这也是为什么氢气被视为一种能源载体的原因。'
    },
    {
      question: '如何验证产生的气体是氢气和氧气？',
      answer: '验证氢气：用拇指堵住集满气体的试管口，靠近火焰，移开拇指点火。如果发出\"噗\"的声音（或轻微爆鸣声），且火焰呈淡蓝色，则证明是氢气。这是因为氢气在空气中燃烧：2H₂ + O₂ → 2H₂O。验证氧气：将带有火星的木条伸入集满气体的试管中，如果木条复燃，则证明是氧气。这是因为氧气能支持燃烧，使带火星的木条复燃。这两个气体检验方法是初中化学实验的基本操作。'
    }
  ];

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.autoPlayTimeout) {
      clearTimeout(this.autoPlayTimeout);
    }
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      const prevStep = this.currentStep;
      this.currentStep++;
      if (prevStep < 2 && this.currentStep >= 2) {
        if (this.isPlaying || !this.isBubblesActive) {
          this.startBubbles();
        }
      }
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      const prevStep = this.currentStep;
      this.currentStep--;
      if (prevStep >= 2 && this.currentStep < 2) {
        this.stopBubbles();
      }
    }
  }

  goToStep(index: number): void {
    const prevStep = this.currentStep;
    this.currentStep = index;
    
    if (prevStep < 2 && this.currentStep >= 2) {
      if (this.isPlaying || !this.isBubblesActive) {
        this.startBubbles();
      }
    } else if (prevStep >= 2 && this.currentStep < 2) {
      this.stopBubbles();
    }
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.startAutoPlay();
      this.resumeBubbles();
    } else {
      this.stopAutoPlay();
      this.pauseBubbles();
    }
  }

  private startAutoPlay(): void {
    if (this.autoPlayTimeout) {
      clearTimeout(this.autoPlayTimeout);
    }
    
    const playNext = () => {
      if (this.isPlaying && this.currentStep < this.steps.length - 1) {
        this.nextStep();
        this.autoPlayTimeout = setTimeout(() => {
          if (this.isPlaying) {
            playNext();
          }
        }, 3000);
      } else {
        this.isPlaying = false;
        this.pauseBubbles();
      }
    };
    
    this.autoPlayTimeout = setTimeout(playNext, 3000);
  }

  private stopAutoPlay(): void {
    this.isPlaying = false;
    if (this.autoPlayTimeout) {
      clearTimeout(this.autoPlayTimeout);
      this.autoPlayTimeout = null;
    }
  }

  private startBubbles(): void {
    this.isBubblesActive = true;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    this.animateBubbles();
  }

  private stopBubbles(): void {
    this.isBubblesActive = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    this.hydrogenBubbles = [];
    this.oxygenBubbles = [];
  }

  private pauseBubbles(): void {
    this.isBubblesActive = false;
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  private resumeBubbles(): void {
    if (this.currentStep >= 2 && !this.isBubblesActive) {
      this.isBubblesActive = true;
      this.animateBubbles();
    }
  }

  private animateBubbles(): void {
    const animate = () => {
      if (!this.isBubblesActive) {
        return;
      }

      if (Math.random() < 0.15) {
        this.hydrogenBubbles.push({
          id: this.bubbleId++,
          x: 120 + Math.random() * 60,
          y: 280,
          size: 4 + Math.random() * 6
        });
      }
      
      if (Math.random() < 0.08) {
        this.oxygenBubbles.push({
          id: this.bubbleId++,
          x: 420 + Math.random() * 60,
          y: 280,
          size: 6 + Math.random() * 8
        });
      }

      this.hydrogenBubbles = this.hydrogenBubbles
        .map(b => ({ ...b, y: b.y - 2, x: b.x + (Math.random() - 0.5) * 2 }))
        .filter(b => b.y > 50);

      this.oxygenBubbles = this.oxygenBubbles
        .map(b => ({ ...b, y: b.y - 1.5, x: b.x + (Math.random() - 0.5) * 2 }))
        .filter(b => b.y > 50);

      if (this.isBubblesActive) {
        this.animationFrame = requestAnimationFrame(animate);
      }
    };

    this.animationFrame = requestAnimationFrame(animate);
  }

  getWaterLevel(): number {
    if (this.currentStep < 2) return 280;
    return 280 - (this.currentStep - 1) * 10;
  }

  getHydrogenLevel(): number {
    if (this.currentStep < 3) return 50;
    return 50 + (this.currentStep - 2) * 40;
  }

  getOxygenLevel(): number {
    if (this.currentStep < 3) return 50;
    return 50 + (this.currentStep - 2) * 20;
  }
}
