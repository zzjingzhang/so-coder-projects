import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../data';

@Component({
  selector: 'app-favorites-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './favorites-dialog.component.html',
  styleUrls: ['./favorites-dialog.component.css']
})
export class FavoritesDialogComponent {
  private dialogRef = inject(MatDialogRef<FavoritesDialogComponent>);
  private quizService = inject(QuizService);

  favoriteQuestions: number[] = this.quizService.favoriteQuestions;
  questions: Question[] = this.quizService.questions;

  getQuestionById(id: number): Question | undefined {
    return this.questions.find(q => q.id === id);
  }

  getQuestionIndex(questionId: number): number {
    return this.quizService.getQuestionIndexById(questionId) + 1;
  }

  goToQuestion(questionId: number): void {
    this.dialogRef.close(questionId);
  }

  close(): void {
    this.dialogRef.close();
  }
}
