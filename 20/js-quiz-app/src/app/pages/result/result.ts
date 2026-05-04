import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuizService } from '../../services/quiz.service';
import { QuizState } from '../../models/quiz-state.model';

@Component({
  selector: 'app-result',
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4">
      <mat-card class="w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        <mat-card-header
          class="text-white p-8"
          [ngClass]="{
            'bg-gradient-to-r from-green-500 to-emerald-600': scorePercentage >= 60,
            'bg-gradient-to-r from-yellow-500 to-orange-500': scorePercentage >= 40 && scorePercentage < 60,
            'bg-gradient-to-r from-red-500 to-pink-600': scorePercentage < 40
          }"
        >
          <div class="w-full text-center">
            <mat-icon class="text-8xl mb-4" *ngIf="scorePercentage >= 60">emoji_events</mat-icon>
            <mat-icon class="text-8xl mb-4" *ngIf="scorePercentage >= 40 && scorePercentage < 60">sentiment_satisfied</mat-icon>
            <mat-icon class="text-8xl mb-4" *ngIf="scorePercentage < 40">sentiment_dissatisfied</mat-icon>
            <mat-card-title class="text-3xl font-bold mb-2">测验完成！</mat-card-title>
            <mat-card-subtitle class="text-white/80 text-lg">
              {{ resultMessage }}
            </mat-card-subtitle>
          </div>
        </mat-card-header>

        <mat-card-content class="p-8">
          <div class="bg-gray-50 rounded-xl p-8 mb-8">
            <div class="text-center mb-6">
              <div class="text-6xl font-bold text-gray-800 mb-2">
                {{ quizState?.score }} / {{ quizState?.totalQuestions }}
              </div>
              <div class="text-xl text-gray-500">正确答案</div>
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-sm text-gray-600 mb-2">
                <span>正确率</span>
                <span>{{ scorePercentage.toFixed(0) }}%</span>
              </div>
              <mat-progress-bar
                mode="determinate"
                [value]="scorePercentage"
                class="h-4 rounded-full overflow-hidden"
                [color]="scorePercentage >= 60 ? 'primary' : 'warn'"
              ></mat-progress-bar>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-green-50 rounded-xl p-6 text-center">
              <mat-icon class="text-4xl text-green-600 mb-2">check_circle</mat-icon>
              <div class="text-2xl font-bold text-green-700">{{ quizState?.score }}</div>
              <div class="text-green-600 mt-1">答对题数</div>
            </div>
            <div class="bg-red-50 rounded-xl p-6 text-center">
              <mat-icon class="text-4xl text-red-600 mb-2">cancel</mat-icon>
              <div class="text-2xl font-bold text-red-700">{{ wrongAnswers }}</div>
              <div class="text-red-600 mt-1">答错题数</div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <mat-icon class="mr-2 text-[var(--color-primary)]">tips_and_updates</mat-icon>
              测验评价
            </h3>
            <p class="text-gray-600 leading-relaxed">
              {{ feedbackMessage }}
            </p>
          </div>
        </mat-card-content>

        <mat-card-actions class="p-8 pt-0">
          <button
            mat-raised-button
            color="primary"
            class="w-full py-4 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            (click)="goHome()"
          >
            <mat-icon class="mr-2">home</mat-icon>
            返回首页
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    mat-card {
      background: var(--color-card-bg);
    }

    mat-card-header {
      margin: 0 !important;
      padding: 0 !important;
    }

    ::ng-deep .mat-mdc-card-header {
      padding: 0 !important;
    }

    ::ng-deep .mat-mdc-card-content {
      display: block;
      padding: 2rem;
    }

    ::ng-deep .mat-mdc-card-actions {
      display: flex;
      padding: 0 2rem 2rem;
    }

    ::ng-deep .mat-mdc-progress-bar {
      border-radius: 9999px;
      overflow: hidden;
    }

    ::ng-deep .mat-mdc-progress-bar .mdc-linear-progress__bar {
      border-radius: 9999px;
    }

    ::ng-deep .mat-mdc-raised-button {
      height: 56px !important;
      font-size: 18px !important;
    }
  `,
})
export class Result implements OnInit {
  private quizService = inject(QuizService);
  private router = inject(Router);

  quizState?: QuizState;

  ngOnInit(): void {
    this.quizService.quizState$.subscribe((state) => {
      this.quizState = state;
    });
  }

  get scorePercentage(): number {
    if (!this.quizState) return 0;
    return (this.quizState.score / this.quizState.totalQuestions) * 100;
  }

  get wrongAnswers(): number {
    if (!this.quizState) return 0;
    return this.quizState.totalQuestions - this.quizState.score;
  }

  get resultMessage(): string {
    const percentage = this.scorePercentage;
    if (percentage >= 80) {
      return '太棒了！你的 JavaScript 知识非常扎实！';
    } else if (percentage >= 60) {
      return '不错！你已经掌握了 JavaScript 的基础知识。';
    } else if (percentage >= 40) {
      return '继续努力！多加练习会更好的。';
    } else {
      return '需要加强学习哦！建议从基础开始复习。';
    }
  }

  get feedbackMessage(): string {
    const percentage = this.scorePercentage;
    if (percentage >= 80) {
      return '你展现了出色的 JavaScript 基础！建议继续深入学习高级概念，如闭包、原型链、异步编程等，向更高的水平迈进。';
    } else if (percentage >= 60) {
      return '你的基础还不错！建议重点复习那些答错的题目，理解错误原因。可以多做一些练习题来巩固知识点。';
    } else if (percentage >= 40) {
      return '不要气馁！学习需要时间和练习。建议系统地复习 JavaScript 基础知识，从变量、数据类型、函数等核心概念开始。';
    } else {
      return 'JavaScript 的学习是一个循序渐进的过程。建议从最基础的概念开始学习，理解变量声明、数据类型、条件语句、循环等基本语法，然后再逐步深入。';
    }
  }

  goHome(): void {
    this.quizService.resetQuiz();
    this.router.navigate(['/']);
  }
}
