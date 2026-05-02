import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzResultModule } from 'ng-zorro-antd/result';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzRadioModule,
    NzProgressModule,
    NzResultModule,
    FormsModule
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  currentQuestionIndex = 0;
  selectedAnswer: number | null = null;
  showResult = false;
  isAnswerChecked = false;
  score = 0;
  totalAnswered = 0;

  questions: Question[] = [
    {
      id: 1,
      question: '在直角三角形中，已知两条直角边分别为 6 和 8，求斜边的长度？',
      options: ['10', '12', '14', '16'],
      correctAnswer: 0,
      explanation: '根据勾股定理：c² = a² + b² = 6² + 8² = 36 + 64 = 100，所以 c = √100 = 10。'
    },
    {
      id: 2,
      question: '在直角三角形中，已知斜边为 13，一条直角边为 5，求另一条直角边的长度？',
      options: ['8', '10', '12', '15'],
      correctAnswer: 2,
      explanation: '根据勾股定理的变形：b² = c² - a² = 13² - 5² = 169 - 25 = 144，所以 b = √144 = 12。'
    },
    {
      id: 3,
      question: '以下哪组数不是勾股数？',
      options: ['(3, 4, 5)', '(5, 12, 13)', '(6, 8, 10)', '(7, 8, 9)'],
      correctAnswer: 3,
      explanation: '验证：7² + 8² = 49 + 64 = 113，而 9² = 81。因为 113 ≠ 81，所以 (7, 8, 9) 不是勾股数。其他选项都满足勾股定理。'
    },
    {
      id: 4,
      question: '一架梯子靠在墙上，梯子底部距离墙 3 米，梯子顶端到达的高度为 4 米。梯子的长度是多少？',
      options: ['5 米', '6 米', '7 米', '8 米'],
      correctAnswer: 0,
      explanation: '这是典型的梯子问题。梯子长度 = √(3² + 4²) = √(9 + 16) = √25 = 5 米。'
    },
    {
      id: 5,
      question: '一个三角形的三条边分别为 9、12、15，这个三角形是什么类型的三角形？',
      options: ['锐角三角形', '直角三角形', '钝角三角形', '无法确定'],
      correctAnswer: 1,
      explanation: '验证：9² + 12² = 81 + 144 = 225，而 15² = 225。因为 9² + 12² = 15²，根据勾股定理的逆定理，这是一个直角三角形。'
    },
    {
      id: 6,
      question: '在平面直角坐标系中，点 A(0, 0) 和点 B(3, 4) 之间的距离是多少？',
      options: ['5', '6', '7', '8'],
      correctAnswer: 0,
      explanation: '横坐标差 = 3 - 0 = 3，纵坐标差 = 4 - 0 = 4。距离 = √(3² + 4²) = √(9 + 16) = √25 = 5。'
    },
    {
      id: 7,
      question: '一个正方形的对角线长度为 10√2，这个正方形的边长是多少？',
      options: ['5', '10', '15', '20'],
      correctAnswer: 1,
      explanation: '正方形的对角线与两条边形成等腰直角三角形。设边长为 x，则 x² + x² = (10√2)²，即 2x² = 200，x² = 100，x = 10。'
    },
    {
      id: 8,
      question: '以下关于勾股定理的说法，哪个是错误的？',
      options: [
        '勾股定理只适用于直角三角形',
        '勾股定理可以表示为：a² + b² = c²',
        '勾股定理的逆定理可以用来判断三角形是否为直角三角形',
        '勾股定理只适用于边长为整数的三角形'
      ],
      correctAnswer: 3,
      explanation: '勾股定理适用于所有直角三角形，无论边长是否为整数。边长为整数的直角三角形只是特殊情况，称为"勾股数"。例如，边长为 1、1、√2 的等腰直角三角形也满足勾股定理。'
    }
  ];

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  selectAnswer(optionIndex: number): void {
    if (!this.isAnswerChecked) {
      this.selectedAnswer = optionIndex;
    }
  }

  checkAnswer(): void {
    if (this.selectedAnswer === null) {
      return;
    }
    
    this.isAnswerChecked = true;
    this.totalAnswered++;
    
    if (this.selectedAnswer === this.currentQuestion.correctAnswer) {
      this.score++;
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedAnswer = null;
      this.isAnswerChecked = false;
    } else {
      this.showResult = true;
    }
  }

  restartQuiz(): void {
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.showResult = false;
    this.isAnswerChecked = false;
    this.score = 0;
    this.totalAnswered = 0;
  }

  getOptionClass(optionIndex: number): string {
    if (!this.isAnswerChecked) {
      return this.selectedAnswer === optionIndex ? 'bg-blue-100 border-blue-500' : '';
    }
    
    if (optionIndex === this.currentQuestion.correctAnswer) {
      return 'bg-green-100 border-green-500';
    }
    
    if (this.selectedAnswer === optionIndex && optionIndex !== this.currentQuestion.correctAnswer) {
      return 'bg-red-100 border-red-500';
    }
    
    return '';
  }

  get isCorrect(): boolean {
    return this.selectedAnswer === this.currentQuestion.correctAnswer;
  }
}
