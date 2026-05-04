import { Component } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
  standalone: false
})
export class InstructionsComponent {
  currentStep = 0;
  
  steps = [
    {
      title: '认识人民币单位',
      content: '人民币有三种主要单位：元、角、分。它们的关系是：1元 = 10角，1角 = 10分，1元 = 100分。',
      icon: '💡'
    },
    {
      title: '硬币操作区',
      content: '点击"+"按钮可以添加对应单位的硬币，点击"-"按钮可以减少硬币。每添加10个"分"硬币，会自动变成1个"角"硬币；每添加10个"角"硬币，会自动变成1个"元"硬币。',
      icon: '🪙'
    },
    {
      title: '小数形式',
      content: '金额还可以用小数表示。例如：3元5角2分 = 3.52元。小数点左边是元，右边第一位是角，第二位是分。',
      icon: '🔢'
    },
    {
      title: '小游戏挑战',
      content: '选择难度后，游戏会给出目标金额。你需要通过操作硬币来匹配这个金额。答对得分，用时越短分数越高！',
      icon: '🎮'
    }
  ];

  faq = [
    {
      question: '为什么要学习人民币换算？',
      answer: '人民币换算是日常生活中非常实用的技能，无论是购物、存钱还是找零，都需要用到这些知识。学好人民币换算可以帮助你更好地管理自己的零花钱！'
    },
    {
      question: '如何快速记住换算关系？',
      answer: '记住这个口诀："元角分，十进率"。意思是每相邻两个单位之间都是10倍的关系。元是最大的单位，分是最小的单位。'
    },
    {
      question: '小数形式怎么读？',
      answer: '例如3.52元读作"三点五二元"，也就是3元5角2分。小数点后面的数字依次读出即可，第一位是角，第二位是分。'
    },
    {
      question: '游戏中怎样才能得高分？',
      answer: '要得高分需要注意两点：第一是要答对，第二是要快。建议先看清楚目标金额，然后先放大额的硬币，再补小额的，这样会更快！'
    }
  ];

  tips = [
    '平时可以多观察商品价格标签，看看是用小数表示的还是用元角分表示的。',
    '可以用真实的硬币来练习，这样印象会更深刻。',
    '和爸爸妈妈一起玩"买东西"的游戏，练习找零和计算。',
    '先从简单的开始，比如只有元的金额，再逐步加入角和分。',
    '记住：10个1分 = 1角，10个1角 = 1元。这是换算的关键！'
  ];

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(index: number): void {
    this.currentStep = index;
  }
}
