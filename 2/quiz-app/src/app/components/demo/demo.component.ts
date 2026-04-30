import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QuizIframeDialogComponent } from '../quiz-iframe-dialog/quiz-iframe-dialog.component';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  constructor(private dialog: MatDialog) {}

  openQuizIframe(): void {
    this.dialog.open(QuizIframeDialogComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: '1200px',
      maxHeight: '800px',
      panelClass: 'iframe-dialog'
    });
  }
}
