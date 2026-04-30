import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../data';

@Component({
  selector: 'app-wrong-questions-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './wrong-questions-dialog.component.html',
  styleUrls: ['./wrong-questions-dialog.component.css']
})
export class WrongQuestionsDialogComponent {
  private dialogRef = inject(MatDialogRef<WrongQuestionsDialogComponent>);
  private quizService = inject(QuizService);

  wrongQuestions: number[] = this.quizService.wrongQuestions;
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
