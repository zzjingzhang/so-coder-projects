import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService, QuestionState } from '../../services/quiz.service';
import { ToastService } from '../../services/toast.service';
import { Question } from '../../data';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OverviewDialogComponent } from '../overview-dialog/overview-dialog.component';
import { FavoritesDialogComponent } from '../favorites-dialog/favorites-dialog.component';
import { WrongQuestionsDialogComponent } from '../wrong-questions-dialog/wrong-questions-dialog.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  private quizService = inject(QuizService);
  private toastService = inject(ToastService);
  private dialog = inject(MatDialog);

  questions$ = this.quizService.questions$;
  currentIndex$ = this.quizService.currentIndex$;
  questionStates$ = this.quizService.questionStates$;
  favoriteCount$ = this.quizService.favoriteQuestions$;

  get questions(): Question[] {
    return this.quizService.questions;
  }

  get currentIndex(): number {
    return this.quizService.currentIndex;
  }

  get currentQuestion(): Question {
    return this.quizService.currentQuestion;
  }

  get currentState(): QuestionState | undefined {
    return this.quizService.getQuestionState(this.currentQuestion.id);
  }

  get favoriteCount(): number {
    return this.quizService.favoriteCount;
  }

  get isFirstQuestion(): boolean {
    return this.currentIndex === 0;
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  get progressPercent(): number {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }

  getOptionLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  selectAnswer(answerIndex: number): void {
    this.quizService.selectAnswer(this.currentQuestion.id, answerIndex);
  }

  showReason(): void {
    const state = this.currentState;
    if (!state || state.selectedAnswer === null) {
      this.toastService.show('请先作答再查看答案', 'warning');
      return;
    }
    this.quizService.showReason(this.currentQuestion.id);
  }

  toggleFavorite(): void {
    this.quizService.toggleFavorite(this.currentQuestion.id);
    const state = this.currentState;
    if (state?.isFavorited) {
      this.toastService.show('已添加到收藏夹', 'success');
    } else {
      this.toastService.show('已取消收藏', 'info');
    }
  }

  goToPrevious(): void {
    this.quizService.goToPreviousQuestion();
  }

  goToNext(): void {
    this.quizService.goToNextQuestion();
  }

  openOverview(): void {
    const dialogRef = this.dialog.open(OverviewDialogComponent, {
      width: '600px',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe((index: number) => {
      if (index !== undefined) {
        this.quizService.goToQuestion(index);
      }
    });
  }

  openFavorites(): void {
    const favorites = this.quizService.favoriteQuestions;
    if (favorites.length === 0) {
      this.toastService.show('收藏夹为空', 'info');
      return;
    }

    const dialogRef = this.dialog.open(FavoritesDialogComponent, {
      width: '500px',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe((questionId: number) => {
      if (questionId !== undefined) {
        const index = this.quizService.getQuestionIndexById(questionId);
        if (index !== -1) {
          this.quizService.goToQuestion(index);
        }
      }
    });
  }

  openWrongQuestions(): void {
    const wrongQuestions = this.quizService.wrongQuestions;
    if (wrongQuestions.length === 0) {
      this.toastService.show('错题本为空', 'info');
      return;
    }

    const dialogRef = this.dialog.open(WrongQuestionsDialogComponent, {
      width: '500px',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe((questionId: number) => {
      if (questionId !== undefined) {
        const index = this.quizService.getQuestionIndexById(questionId);
        if (index !== -1) {
          this.quizService.goToQuestion(index);
        }
      }
    });
  }

  getOptionClass(index: number): string {
    const state = this.currentState;
    const question = this.currentQuestion;

    if (!state || state.selectedAnswer === null) {
      return 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
    }

    if (index === question.answer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }

    if (index === state.selectedAnswer && index !== question.answer) {
      return 'border-red-500 bg-red-50 text-red-700';
    }

    return 'border-gray-200 bg-gray-50 text-gray-400';
  }

  getOptionBadgeClass(index: number): string {
    const state = this.currentState;
    const question = this.currentQuestion;

    if (!state || state.selectedAnswer === null) {
      return 'bg-gray-100 text-gray-600';
    }

    if (index === question.answer) {
      return 'bg-green-500 text-white';
    }

    if (index === state.selectedAnswer && index !== question.answer) {
      return 'bg-red-500 text-white';
    }

    return 'bg-gray-200 text-gray-400';
  }

  isOptionClickable(): boolean {
    const state = this.currentState;
    return !state || state.selectedAnswer === null;
  }

  isOptionSelected(index: number): boolean {
    const state = this.currentState;
    return state?.selectedAnswer === index;
  }

  isCorrectAnswer(index: number): boolean {
    return this.currentQuestion.answer === index;
  }

  isAnswerShown(): boolean {
    const state = this.currentState;
    return state !== undefined && state.selectedAnswer !== null;
  }
}
