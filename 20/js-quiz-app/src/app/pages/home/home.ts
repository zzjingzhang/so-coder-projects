import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4">
      <mat-card class="w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
        <mat-card-header class="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-8">
          <div class="w-full text-center">
            <mat-icon class="text-6xl mb-4">quiz</mat-icon>
            <mat-card-title class="text-3xl font-bold mb-2">{{ quizConfig.title }}</mat-card-title>
            <mat-card-subtitle class="text-white/80 text-lg">{{ quizConfig.description }}</mat-card-subtitle>
          </div>
        </mat-card-header>

        <mat-card-content class="p-8">
          <div class="grid grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-50 rounded-xl p-6 text-center transition-all duration-300 hover:bg-gray-100">
              <mat-icon class="text-4xl text-[var(--color-primary)] mb-2">format_list_bulleted</mat-icon>
              <div class="text-3xl font-bold text-gray-800">{{ totalQuestions }}</div>
              <div class="text-gray-500 mt-1">题目数量</div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 text-center transition-all duration-300 hover:bg-gray-100">
              <mat-icon class="text-4xl text-[var(--color-primary)] mb-2">timer</mat-icon>
              <div class="text-3xl font-bold text-gray-800">{{ formattedTime }}</div>
              <div class="text-gray-500 mt-1">总时长</div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <mat-icon class="mr-2 text-[var(--color-primary)]">info</mat-icon>
              测验说明
            </h3>
            <ul class="space-y-2 text-gray-600">
              <li class="flex items-start">
                <mat-icon class="text-green-500 mr-2 mt-0.5" style="font-size: 18px;">check_circle</mat-icon>
                <span>每题只有一个正确答案，请选择你认为正确的选项</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-green-500 mr-2 mt-0.5" style="font-size: 18px;">check_circle</mat-icon>
                <span>可以随时点击"停止"按钮结束测验</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-green-500 mr-2 mt-0.5" style="font-size: 18px;">check_circle</mat-icon>
                <span>时间耗尽后将自动结束测验并显示结果</span>
              </li>
              <li class="flex items-start">
                <mat-icon class="text-green-500 mr-2 mt-0.5" style="font-size: 18px;">check_circle</mat-icon>
                <span>答完所有题目后点击"下一题"即可查看结果</span>
              </li>
            </ul>
          </div>
        </mat-card-content>

        <mat-card-actions class="p-8 pt-0">
          <button
            mat-raised-button
            color="primary"
            class="w-full py-4 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            (click)="startQuiz()"
          >
            <mat-icon class="mr-2">play_arrow</mat-icon>
            开始测验
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

    ::ng-deep .mat-mdc-raised-button {
      height: 56px !important;
      font-size: 18px !important;
    }
  `,
})
export class Home {
  private quizService = inject(QuizService);
  private router = inject(Router);

  quizConfig = this.quizService.getQuizConfig();
  totalQuestions = this.quizService.getQuestions().length;

  get formattedTime(): string {
    const minutes = Math.floor(this.quizConfig.totalTime / 60);
    const seconds = this.quizConfig.totalTime % 60;
    if (seconds === 0) {
      return `${minutes}分钟`;
    }
    return `${minutes}分${seconds}秒`;
  }

  startQuiz(): void {
    this.quizService.startQuiz();
    this.router.navigate(['/quiz']);
  }
}
