import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizService } from '../../services/quiz.service';
import { Question } from '../../data';

@Component({
  selector: 'app-overview-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './overview-dialog.component.html',
  styleUrls: ['./overview-dialog.component.css']
})
export class OverviewDialogComponent {
  private dialogRef = inject(MatDialogRef<OverviewDialogComponent>);
  private quizService = inject(QuizService);

  questions: Question[] = this.quizService.questions;
  currentIndex: number = this.quizService.currentIndex;

  getStatusClass(questionId: number): string {
    const status = this.quizService.getQuestionStatus(questionId);
    const isCurrent = this.quizService.getQuestionIndexById(questionId) === this.currentIndex;
    
    if (isCurrent) {
      return 'ring-2 ring-blue-500';
    }
    
    switch (status) {
      case 'correct':
        return 'bg-green-100 border-green-500 text-green-700';
      case 'wrong':
        return 'bg-red-100 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-600';
    }
  }

  getStatusIcon(questionId: number): string {
    const status = this.quizService.getQuestionStatus(questionId);
    switch (status) {
      case 'correct':
        return 'check_circle';
      case 'wrong':
        return 'cancel';
      default:
        return 'radio_button_unchecked';
    }
  }

  goToQuestion(index: number): void {
    this.dialogRef.close(index);
  }

  close(): void {
    this.dialogRef.close();
  }
}
