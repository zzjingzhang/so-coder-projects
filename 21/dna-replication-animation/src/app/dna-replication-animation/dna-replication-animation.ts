import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';

interface BasePair {
  top: string;
  bottom: string;
  topColor: string;
  bottomColor: string;
}

interface AnimationStep {
  id: number;
  title: string;
  description: string;
  action: string;
}

@Component({
  selector: 'app-dna-replication-animation',
  templateUrl: './dna-replication-animation.html',
  styleUrls: ['./dna-replication-animation.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzSelectModule,
    NzCollapseModule
  ]
})
export class DnaReplicationAnimationComponent implements OnInit {
  baseColors: Record<string, string> = {
    'A': '#FF6B6B',
    'T': '#4ECDC4',
    'G': '#45B7D1',
    'C': '#96CEB4'
  };

  baseNames: Record<string, string> = {
    'A': '腺嘌呤',
    'T': '胸腺嘧啶',
    'G': '鸟嘌呤',
    'C': '胞嘧啶'
  };

  basePairs: BasePair[] = [
    { top: 'A', bottom: 'T', topColor: '#FF6B6B', bottomColor: '#4ECDC4' },
    { top: 'T', bottom: 'A', topColor: '#4ECDC4', bottomColor: '#FF6B6B' },
    { top: 'G', bottom: 'C', topColor: '#45B7D1', bottomColor: '#96CEB4' },
    { top: 'C', bottom: 'G', topColor: '#96CEB4', bottomColor: '#45B7D1' },
    { top: 'A', bottom: 'T', topColor: '#FF6B6B', bottomColor: '#4ECDC4' },
    { top: 'T', bottom: 'A', topColor: '#4ECDC4', bottomColor: '#FF6B6B' },
    { top: 'G', bottom: 'C', topColor: '#45B7D1', bottomColor: '#96CEB4' },
    { top: 'C', bottom: 'G', topColor: '#96CEB4', bottomColor: '#45B7D1' }
  ];

  animationSteps: AnimationStep[] = [
    {
      id: 0,
      title: '初始状态',
      description: 'DNA双螺旋结构保持完整，两条链通过碱基对之间的氢键连接。',
      action: 'initial'
    },
    {
      id: 1,
      title: '解旋酶结合',
      description: '解旋酶（Helicase）结合到DNA的复制起点，准备打开双螺旋结构。',
      action: 'helicase_bind'
    },
    {
      id: 2,
      title: 'DNA解旋',
      description: '解旋酶破坏碱基对之间的氢键，使DNA双螺旋解开，形成复制叉。',
      action: 'unwind'
    },
    {
      id: 3,
      title: '单链稳定',
      description: '单链结合蛋白（SSB）结合到解开的单链上，防止它们重新配对。',
      action: 'ssb_bind'
    },
    {
      id: 4,
      title: '引物合成',
      description: '引物酶（Primase）合成一段RNA引物，为DNA聚合酶提供起点。',
      action: 'primer_synthesis'
    },
    {
      id: 5,
      title: 'DNA聚合酶结合',
      description: 'DNA聚合酶结合到引物末端，开始沿着模板链合成新的DNA链。',
      action: 'polymerase_bind'
    },
    {
      id: 6,
      title: '碱基配对',
      description: 'DNA聚合酶按照碱基互补配对原则（A-T，G-C），在新链上添加正确的核苷酸。',
      action: 'base_pairing'
    },
    {
      id: 7,
      title: '新链延伸',
      description: 'DNA聚合酶沿5\'→3\'方向连续合成前导链，后随链则通过冈崎片段不连续合成。',
      action: 'chain_elongation'
    },
    {
      id: 8,
      title: '半保留复制完成',
      description: '复制完成后，每个新的DNA分子都包含一条旧链和一条新合成的链，这就是半保留复制。',
      action: 'complete'
    }
  ];

  currentStep: number = 0;
  isPlaying: boolean = false;
  animationSpeed: number = 2000;
  showQuiz: boolean = false;
  currentQuizIndex: number = 0;
  quizAnswers: number[] = [];

  // 动画状态
  dnaUnwound: boolean = false;
  helicasePosition: number = 0;
  polymerasePosition: number = 0;
  newStrandSynthesized: number = 0;
  hydrogenBondsVisible: boolean = true;
  ssbVisible: boolean = false;
  primerVisible: boolean = false;
  replicationComplete: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.resetAnimation();
  }

  resetAnimation(): void {
    this.currentStep = 0;
    this.isPlaying = false;
    this.dnaUnwound = false;
    this.helicasePosition = 0;
    this.polymerasePosition = 0;
    this.newStrandSynthesized = 0;
    this.hydrogenBondsVisible = true;
    this.ssbVisible = false;
    this.primerVisible = false;
    this.replicationComplete = false;
  }

  playAnimation(): void {
    this.isPlaying = true;
    this.playStep();
  }

  playStep(): void {
    if (!this.isPlaying || this.currentStep >= this.animationSteps.length - 1) {
      this.isPlaying = false;
      return;
    }

    setTimeout(() => {
      this.nextStep();
      this.playStep();
    }, this.animationSpeed);
  }

  pauseAnimation(): void {
    this.isPlaying = false;
  }

  nextStep(): void {
    if (this.currentStep < this.animationSteps.length - 1) {
      this.currentStep++;
      this.applyStepAction(this.currentStep);
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.applyStepAction(this.currentStep, true);
    }
  }

  goToStep(stepId: number): void {
    if (stepId >= 0 && stepId < this.animationSteps.length) {
      this.currentStep = stepId;
      this.applyStepAction(stepId);
    }
  }

  applyStepAction(stepId: number, isReverse: boolean = false): void {
    const step = this.animationSteps[stepId];
    const forward = !isReverse;

    switch (step.action) {
      case 'initial':
        this.resetAnimation();
        break;
      case 'helicase_bind':
        this.helicasePosition = forward ? 1 : 0;
        break;
      case 'unwind':
        this.dnaUnwound = forward;
        this.hydrogenBondsVisible = !forward;
        this.helicasePosition = forward ? 2 : 1;
        break;
      case 'ssb_bind':
        this.ssbVisible = forward;
        break;
      case 'primer_synthesis':
        this.primerVisible = forward;
        break;
      case 'polymerase_bind':
        this.polymerasePosition = forward ? 1 : 0;
        break;
      case 'base_pairing':
        this.newStrandSynthesized = forward ? 2 : 0;
        break;
      case 'chain_elongation':
        this.newStrandSynthesized = forward ? 6 : 2;
        this.polymerasePosition = forward ? 3 : 1;
        break;
      case 'complete':
        this.replicationComplete = forward;
        this.newStrandSynthesized = forward ? 8 : 6;
        break;
    }
  }

  getComplementaryBase(base: string): string {
    const pairs: Record<string, string> = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G' };
    return pairs[base] || base;
  }

  getBasePairInfo(base: string): { name: string; color: string; complementary: string } {
    return {
      name: this.baseNames[base],
      color: this.baseColors[base],
      complementary: this.getComplementaryBase(base)
    };
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }

  // 小测验相关方法
  toggleQuiz(): void {
    this.showQuiz = !this.showQuiz;
  }

  selectQuizAnswer(questionIndex: number, answerIndex: number): void {
    this.quizAnswers[questionIndex] = answerIndex;
  }

  isQuizAnswerCorrect(questionIndex: number): boolean {
    const quizQuestions = this.getQuizQuestions();
    if (this.quizAnswers[questionIndex] === undefined) return false;
    return this.quizAnswers[questionIndex] === quizQuestions[questionIndex].correctAnswer;
  }

  getQuizQuestions() {
    return [
      {
        question: 'DNA解旋酶的主要功能是什么？',
        options: [
          '合成新的DNA链',
          '打开DNA双螺旋，破坏氢键',
          '连接冈崎片段',
          '合成RNA引物'
        ],
        correctAnswer: 1,
        explanation: '解旋酶的主要功能是在复制起点处打开DNA双螺旋结构，通过破坏碱基对之间的氢键来实现。'
      },
      {
        question: '根据碱基互补配对原则，腺嘌呤(A)与哪个碱基配对？',
        options: [
          '鸟嘌呤(G)',
          '胞嘧啶(C)',
          '胸腺嘧啶(T)',
          '尿嘧啶(U)'
        ],
        correctAnswer: 2,
        explanation: '在DNA中，腺嘌呤(A)总是与胸腺嘧啶(T)配对，通过两条氢键连接；鸟嘌呤(G)与胞嘧啶(C)配对，通过三条氢键连接。'
      },
      {
        question: 'DNA聚合酶合成新链的方向是？',
        options: [
          '3\'→5\'方向',
          '5\'→3\'方向',
          '两个方向都可以',
          '随机方向'
        ],
        correctAnswer: 1,
        explanation: 'DNA聚合酶只能沿5\'→3\'方向合成新链，这导致了前导链的连续合成和后随链的不连续合成（冈崎片段）。'
      },
      {
        question: '半保留复制的含义是什么？',
        options: [
          '只复制DNA的一半',
          '每个新DNA分子包含一条旧链和一条新链',
          '只在细胞周期的一半时间进行复制',
          '复制后DNA长度减半'
        ],
        correctAnswer: 1,
        explanation: '半保留复制意味着复制产生的每个新DNA分子都包含一条来自亲本的旧链和一条新合成的链，这确保了遗传信息的准确传递。'
      },
      {
        question: '后随链形成冈崎片段的原因是什么？',
        options: [
          'DNA聚合酶只能沿5\'→3\'方向合成',
          '后随链模板方向相反',
          '解旋酶工作速度太快',
          '缺少足够的核苷酸'
        ],
        correctAnswer: 0,
        explanation: '由于DNA聚合酶只能沿5\'→3\'方向合成新链，而后随链的模板方向与复制叉移动方向相反，因此只能通过合成短的冈崎片段来进行不连续复制。'
      }
    ];
  }
}
