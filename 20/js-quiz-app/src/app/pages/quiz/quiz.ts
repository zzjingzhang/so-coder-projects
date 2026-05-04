import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../models/question.model';
import { QuizState } from '../../models/quiz-state.model';

@Component({
  selector: 'app-quiz',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatRadioModule,
    FormsModule,
  ],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center p-4">
      <mat-card class="w-full max-w-3xl shadow-2xl rounded-2xl overflow-hidden transition-all duration-300">
        <mat-card-header class="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white p-6">
          <div class="w-full">
            <div class="flex justify-between items-center mb-4">
              <div class="flex items-center">
                <mat-icon class="mr-2">format_list_bulleted</mat-icon>
                <span class="text-lg font-medium">第 {{ currentQuestionIndex + 1 }} 题 / 共 {{ quizState?.totalQuestions }} 题</span>
              </div>
              <div class="flex items-center" [class.text-yellow-300]="isTimeWarning">
                <mat-icon class="mr-2">timer</mat-icon>
                <span class="text-lg font-medium">{{ formattedTime }}</span>
              </div>
            </div>
            <mat-progress-bar
              mode="determinate"
              [value]="progressPercentage"
              class="h-2 rounded-full overflow-hidden"
              [color]="isTimeWarning ? 'warn' : 'primary'"
            ></mat-progress-bar>
          </div>
        </mat-card-header>

        <mat-card-content class="p-8">
          <div *ngIf="currentQuestion" class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
              {{ currentQuestion.text }}
            </h2>

            <mat-radio-group
              [(ngModel)]="selectedAnswer"
              (change)="onOptionSelect($event.value)"
              class="flex flex-col space-y-4"
            >
              <mat-radio-button
                *ngFor="let option of currentQuestion.options; let i = index"
                [value]="i"
                class="w-full p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 border-2 border-transparent"
                [class.border-blue-500]="selectedAnswer === i"
                [class.bg-blue-50]="selectedAnswer === i"
              >
                <span class="text-lg text-gray-700">{{ option }}</span>
              </mat-radio-button>
            </mat-radio-group>
          </div>
        </mat-card-content>

        <mat-card-actions class="p-8 pt-0 flex justify-between">
          <button
            mat-stroked-button
            color="warn"
            class="px-8 py-3 text-lg font-medium rounded-xl transition-all duration-300 hover:bg-red-50"
            (click)="stopQuiz()"
          >
            <mat-icon class="mr-2">stop</mat-icon>
            停止
          </button>
          <button
            mat-raised-button
            color="primary"
            class="px-8 py-3 text-lg font-medium rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
            (click)="nextQuestion()"
          >
            <span *ngIf="!isLastQuestion">
              下一题
              <mat-icon class="ml-2">arrow_forward</mat-icon>
            </span>
            <span *ngIf="isLastQuestion">
              完成
              <mat-icon class="ml-2">check</mat-icon>
            </span>
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
      justify-content: space-between;
      padding: 0 2rem 2rem;
    }

    ::ng-deep .mat-mdc-radio-button {
      display: flex;
      align-items: center;
    }

    ::ng-deep .mat-mdc-radio-button .mdc-form-field {
      width: 100%;
    }

    ::ng-deep .mat-mdc-progress-bar {
      border-radius: 9999px;
      overflow: hidden;
    }

    ::ng-deep .mat-mdc-progress-bar .mdc-linear-progress__bar {
      border-radius: 9999px;
    }

    ::ng-deep .mat-mdc-raised-button,
    ::ng-deep .mat-mdc-stroked-button {
      height: 52px !important;
      font-size: 16px !important;
    }
  `,
})
export class Quiz implements OnInit, OnDestroy {
  private quizService = inject(QuizService);
  private router = inject(Router);
  private subscription?: Subscription;

  quizState?: QuizState;
  currentQuestion?: Question | null;
  selectedAnswer: number | null = null;

  ngOnInit(): void {
    this.subscription = this.quizService.quizState$.subscribe((state) => {
      this.quizState = state;
      this.currentQuestion = this.quizService.getCurrentQuestion();
      this.selectedAnswer = state.answers[state.currentQuestionIndex];

      if (state.isCompleted) {
        this.router.navigate(['/result']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get currentQuestionIndex(): number {
    return this.quizState?.currentQuestionIndex ?? 0;
  }

  get isLastQuestion(): boolean {
    return (
      this.currentQuestionIndex ===
      (this.quizState?.totalQuestions ?? 1) - 1
    );
  }

  get formattedTime(): string {
    return this.quizService.formatTime(this.quizState?.timeRemaining ?? 0);
  }

  get isTimeWarning(): boolean {
    return (this.quizState?.timeRemaining ?? 0) <= 60;
  }

  get progressPercentage(): number {
    return this.quizService.getProgressPercentage();
  }

  onOptionSelect(index: number): void {
    this.quizService.selectAnswer(index);
  }

  nextQuestion(): void {
    if (this.selectedAnswer !== null) {
      this.quizService.nextQuestion();
    }
  }

  stopQuiz(): void {
    this.quizService.stopQuiz();
    this.router.navigate(['/result']);
  }
}
