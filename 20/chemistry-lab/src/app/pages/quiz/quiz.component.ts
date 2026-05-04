import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  id: number;
  text: string;
  options: Option[];
  explanation: string;
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Answer {
  questionId: number;
  selectedOption: string | null;
  isCorrect: boolean;
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    RadioButtonModule,
    MessageModule,
    ProgressBarModule,
    TagModule,
    DividerModule,
    CommonModule,
    FormsModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-indigo-800 mb-2">
            知识检验
          </h1>
          <p class="text-gray-600">
            测试你对二氧化碳制取实验的理解
          </p>
        </div>

        @if (!isFinished) {
          <div class="mb-6">
            <div class="flex justify-between mb-2">
              <span class="text-gray-700 font-medium">
                第 {{ currentQuestionIndex + 1 }} 题，共 {{ questions.length }} 题
              </span>
              <span class="text-gray-700 font-medium">
                得分：{{ correctCount }}/{{ questions.length }}
              </span>
            </div>
            <p-progressBar 
              [value]="((currentQuestionIndex + 1) / questions.length) * 100"
              [showValue]="false"
              styleClass="h-3"
            ></p-progressBar>
          </div>

          <p-card class="shadow-lg mb-6">
            <ng-template pTemplate="header">
              <div class="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
                <span class="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center font-bold">
                  {{ currentQuestionIndex + 1 }}
                </span>
                <span class="text-lg font-semibold">问题</span>
              </div>
            </ng-template>

            <div class="p-4">
              <p class="text-xl text-gray-800 mb-6 leading-relaxed">
                {{ currentQuestion.text }}
              </p>

              <div class="space-y-4">
                @for (option of currentQuestion.options; track option.id) {
                  <div 
                    class="flex items-center p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer"
                    [class.border-blue-400]="selectedOption === option.id"
                    [class.border-gray-200]="selectedOption !== option.id"
                    [class.bg-blue-50]="selectedOption === option.id"
                    (click)="selectOption(option.id)"
                  >
                    <p-radioButton 
                      [value]="option.id" 
                      [(ngModel)]="selectedOption" 
                      [inputId]="option.id"
                      class="mr-4"
                    ></p-radioButton>
                    <label [for]="option.id" class="text-lg text-gray-700 cursor-pointer flex-1">
                      {{ option.text }}
                    </label>
                  </div>
                }
              </div>

              @if (showExplanation) {
                <div class="mt-6 p-4 rounded-lg"
                  [class.bg-green-50]="isCurrentAnswerCorrect"
                  [class.bg-red-50]="!isCurrentAnswerCorrect"
                  [class.border]="true"
                  [class.border-green-200]="isCurrentAnswerCorrect"
                  [class.border-red-200]="!isCurrentAnswerCorrect"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-2xl">
                      {{ isCurrentAnswerCorrect ? '✅' : '❌' }}
                    </span>
                    <span class="text-lg font-bold"
                      [class.text-green-700]="isCurrentAnswerCorrect"
                      [class.text-red-700]="!isCurrentAnswerCorrect"
                    >
                      {{ isCurrentAnswerCorrect ? '回答正确！' : '回答错误' }}
                    </span>
                  </div>
                  <p class="text-gray-700 leading-relaxed">
                    {{ currentQuestion.explanation }}
                  </p>
                </div>
              }
            </div>

            <ng-template pTemplate="footer">
              <div class="flex justify-between items-center">
                <p-button 
                  label="上一题" 
                  icon="pi pi-arrow-left"
                  [disabled]="currentQuestionIndex === 0"
                  (click)="prevQuestion()"
                  styleClass="p-button-secondary"
                ></p-button>

                @if (!showExplanation) {
                  <p-button 
                    label="提交答案" 
                    icon="pi pi-check"
                    [disabled]="!selectedOption"
                    (click)="submitAnswer()"
                    styleClass="p-button-primary"
                  ></p-button>
                }

                @if (showExplanation) {
                  @if (currentQuestionIndex < questions.length - 1) {
                    <p-button 
                      label="下一题" 
                      icon="pi pi-arrow-right"
                      iconPos="right"
                      (click)="nextQuestion()"
                      styleClass="p-button-success"
                    ></p-button>
                  } @else {
                    <p-button 
                      label="查看结果" 
                      icon="pi pi-chart-bar"
                      iconPos="right"
                      (click)="finishQuiz()"
                      styleClass="p-button-success"
                    ></p-button>
                  }
                }
              </div>
            </ng-template>
          </p-card>
        }

        @if (isFinished) {
          <div class="text-center mb-8">
            <div class="inline-block">
              <div class="relative w-48 h-48 mx-auto mb-6">
                <svg class="w-48 h-48 transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#e5e7eb"
                    stroke-width="12"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    [attr.stroke]="scoreColor"
                    stroke-width="12"
                    stroke-linecap="round"
                    [attr.stroke-dasharray]="circleCircumference"
                    [attr.stroke-dashoffset]="circleDashOffset"
                    class="transition-all duration-1000"
                  />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-5xl font-bold" [class.text-green-600]="correctCount >= 3" [class.text-yellow-600]="correctCount === 2" [class.text-red-600]="correctCount < 2">
                    {{ correctCount }}
                  </span>
                  <span class="text-gray-500">共 {{ questions.length }} 题</span>
                </div>
              </div>

              <h2 class="text-3xl font-bold mb-2"
                [class.text-green-600]="correctCount >= 3"
                [class.text-yellow-600]="correctCount === 2"
                [class.text-red-600]="correctCount < 2"
              >
                {{ resultMessage }}
              </h2>
              <p class="text-lg text-gray-600">
                得分率：{{ (scorePercent * 100).toFixed(0) }}%
              </p>
            </div>
          </div>

          <p-card header="答题详情" class="shadow-lg mb-6">
            <div class="space-y-4">
              @for (question of questions; track question.id; let i = $index) {
                <div class="p-4 rounded-lg border"
                  [class.bg-green-50]="answers[i]?.isCorrect"
                  [class.bg-red-50]="!answers[i]?.isCorrect"
                  [class.border-green-200]="answers[i]?.isCorrect"
                  [class.border-red-200]="!answers[i]?.isCorrect"
                >
                  <div class="flex items-start gap-3">
                    <span class="text-2xl flex-shrink-0">
                      {{ answers[i]?.isCorrect ? '✅' : '❌' }}
                    </span>
                    <div class="flex-1">
                      <p class="font-semibold text-gray-800 mb-2">
                        第 {{ i + 1 }} 题：{{ question.text }}
                      </p>
                      <p class="text-sm mb-1"
                        [class.text-green-600]="answers[i]?.isCorrect"
                        [class.text-red-600]="!answers[i]?.isCorrect"
                      >
                        你的选择：{{ getOptionText(question.id, answers[i]?.selectedOption) }}
                      </p>
                      @if (!answers[i]?.isCorrect) {
                        <p class="text-sm text-green-600">
                          正确答案：{{ getCorrectOptionText(question) }}
                        </p>
                      }
                      <p class="text-sm text-gray-600 mt-2 italic">
                        {{ question.explanation }}
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </p-card>

          <div class="flex justify-center gap-4">
            <p-button 
              label="重新测验" 
              icon="pi pi-refresh"
              (click)="restartQuiz()"
              styleClass="p-button-primary"
            ></p-button>
            <p-button 
              label="返回实验演示" 
              icon="pi pi-arrow-left"
              (click)="goToExperiment()"
              styleClass="p-button-secondary"
            ></p-button>
            <p-button 
              label="查看实验原理" 
              icon="pi pi-book"
              (click)="goToPrinciple()"
              styleClass="p-button-info"
            ></p-button>
          </div>
        }

        <div class="mt-8 text-center">
          <p-divider></p-divider>
          <p class="text-gray-500 text-sm">
            希望通过这个交互式实验，你能更好地理解二氧化碳的制取原理！
          </p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class QuizComponent implements OnInit {
  questions: Question[] = [
    {
      id: 1,
      text: '实验室制取二氧化碳，最适宜的药品是？',
      options: [
        { id: 'A', text: '碳酸钠粉末和稀盐酸', isCorrect: false },
        { id: 'B', text: '碳酸钙粉末和稀盐酸', isCorrect: false },
        { id: 'C', text: '大理石（或石灰石）和稀盐酸', isCorrect: true },
        { id: 'D', text: '大理石和浓盐酸', isCorrect: false }
      ],
      explanation: '选择大理石（或石灰石）和稀盐酸的原因：大理石主要成分是碳酸钙，反应速率适中，便于控制和收集气体。碳酸钠或碳酸钙粉末反应太快，难以控制；浓盐酸易挥发，会使制得的CO₂中混有HCl气体。'
    },
    {
      id: 2,
      text: '实验室制取二氧化碳时，为什么不能用硫酸？',
      options: [
        { id: 'A', text: '硫酸太危险', isCorrect: false },
        { id: 'B', text: '硫酸与碳酸钙反应生成的硫酸钙微溶于水，会覆盖在碳酸钙表面，阻止反应继续进行', isCorrect: true },
        { id: 'C', text: '硫酸价格太贵', isCorrect: false },
        { id: 'D', text: '硫酸会产生有毒气体', isCorrect: false }
      ],
      explanation: '硫酸与碳酸钙反应生成硫酸钙（CaSO₄），硫酸钙微溶于水，会覆盖在碳酸钙表面，形成一层保护膜，阻止硫酸与碳酸钙继续接触，从而使反应停止。这就是实验室不用硫酸制取CO₂的主要原因。'
    },
    {
      id: 3,
      text: '收集二氧化碳应该采用什么方法？',
      options: [
        { id: 'A', text: '排水法', isCorrect: false },
        { id: 'B', text: '向下排空气法', isCorrect: false },
        { id: 'C', text: '向上排空气法', isCorrect: true },
        { id: 'D', text: '以上方法都可以', isCorrect: false }
      ],
      explanation: '二氧化碳的密度比空气大（约是空气的1.5倍），所以应该使用向上排空气法收集。虽然二氧化碳能溶于水（1体积水能溶解约1体积CO₂），但溶解速率较慢，有时也可用排水法收集，但向上排空气法更常用。'
    },
    {
      id: 4,
      text: '如何检验集气瓶中的二氧化碳是否已收集满？',
      options: [
        { id: 'A', text: '将燃着的木条伸入集气瓶中', isCorrect: false },
        { id: 'B', text: '将燃着的木条放在集气瓶口', isCorrect: true },
        { id: 'C', text: '倒入澄清石灰水振荡', isCorrect: false },
        { id: 'D', text: '闻气味', isCorrect: false }
      ],
      explanation: '验满方法：将燃着的木条放在集气瓶口，若木条熄灭，则证明二氧化碳已收集满。注意：不能将木条伸入瓶中，因为二氧化碳密度比空气大，先聚集在底部，只有瓶口处有CO₂时，才说明已收集满。倒入澄清石灰水是检验气体是不是CO₂的方法，不是验满方法。'
    },
    {
      id: 5,
      text: '实验室制取二氧化碳的反应类型是什么？',
      options: [
        { id: 'A', text: '化合反应', isCorrect: false },
        { id: 'B', text: '分解反应', isCorrect: false },
        { id: 'C', text: '置换反应', isCorrect: false },
        { id: 'D', text: '复分解反应', isCorrect: true }
      ],
      explanation: '反应方程式：CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑。这是一个复分解反应，两种化合物互相交换成分，生成另外两种化合物。实际上反应分两步：CaCO₃ + 2HCl → CaCl₂ + H₂CO₃，然后H₂CO₃ → H₂O + CO₂↑，碳酸不稳定，容易分解成水和二氧化碳。'
    }
  ];

  currentQuestionIndex = 0;
  selectedOption: string | null = null;
  showExplanation = false;
  isFinished = false;
  correctCount = 0;
  answers: Answer[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.answers = new Array(this.questions.length).fill(null).map(() => ({
      questionId: 0,
      selectedOption: null,
      isCorrect: false
    }));
  }

  get currentQuestion(): Question {
    return this.questions[this.currentQuestionIndex];
  }

  get isCurrentAnswerCorrect(): boolean {
    const correctOption = this.currentQuestion.options.find(o => o.isCorrect);
    return this.selectedOption === correctOption?.id;
  }

  get scorePercent(): number {
    return this.correctCount / this.questions.length;
  }

  get scoreColor(): string {
    if (this.correctCount >= 4) return '#22c55e';
    if (this.correctCount >= 3) return '#eab308';
    return '#ef4444';
  }

  get resultMessage(): string {
    if (this.correctCount === this.questions.length) return '🎉 太棒了！全部正确！';
    if (this.correctCount >= 4) return '👏 优秀！继续加油！';
    if (this.correctCount >= 3) return '👍 不错！再复习一下！';
    if (this.correctCount >= 2) return '📚 需要更多练习！';
    return '💪 加油！重新学习一下吧！';
  }

  get circleCircumference(): number {
    return 2 * Math.PI * 88;
  }

  get circleDashOffset(): number {
    return this.circleCircumference * (1 - this.scorePercent);
  }

  selectOption(optionId: string) {
    this.selectedOption = optionId;
  }

  submitAnswer() {
    if (!this.selectedOption) return;

    this.showExplanation = true;

    const correctOption = this.currentQuestion.options.find(o => o.isCorrect);
    const isCorrect = this.selectedOption === correctOption?.id;

    this.answers[this.currentQuestionIndex] = {
      questionId: this.currentQuestion.id,
      selectedOption: this.selectedOption,
      isCorrect: isCorrect
    };

    if (isCorrect) {
      this.correctCount++;
    }
  }

  prevQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.selectedOption = this.answers[this.currentQuestionIndex]?.selectedOption || null;
      this.showExplanation = !!this.answers[this.currentQuestionIndex]?.selectedOption;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.selectedOption = this.answers[this.currentQuestionIndex]?.selectedOption || null;
      this.showExplanation = !!this.answers[this.currentQuestionIndex]?.selectedOption;
    }
  }

  finishQuiz() {
    this.isFinished = true;
  }

  restartQuiz() {
    this.currentQuestionIndex = 0;
    this.selectedOption = null;
    this.showExplanation = false;
    this.isFinished = false;
    this.correctCount = 0;
    this.answers = new Array(this.questions.length).fill(null).map(() => ({
      questionId: 0,
      selectedOption: null,
      isCorrect: false
    }));
  }

  getOptionText(questionId: number, optionId: string | null | undefined): string {
    if (!optionId) return '未作答';
    const question = this.questions.find(q => q.id === questionId);
    const option = question?.options.find(o => o.id === optionId);
    return `${optionId}. ${option?.text || '未知'}`;
  }

  getCorrectOptionText(question: Question): string {
    const correctOption = question.options.find(o => o.isCorrect);
    return `${correctOption?.id}. ${correctOption?.text || '未知'}`;
  }

  goToExperiment() {
    this.router.navigate(['/experiment']);
  }

  goToPrinciple() {
    this.router.navigate(['/principle']);
  }
}
