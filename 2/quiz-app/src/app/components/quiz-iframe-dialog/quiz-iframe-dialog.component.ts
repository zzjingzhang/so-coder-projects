import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-quiz-iframe-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './quiz-iframe-dialog.component.html',
  styleUrls: ['./quiz-iframe-dialog.component.css']
})
export class QuizIframeDialogComponent {
  private dialogRef = inject(MatDialogRef<QuizIframeDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }
}
