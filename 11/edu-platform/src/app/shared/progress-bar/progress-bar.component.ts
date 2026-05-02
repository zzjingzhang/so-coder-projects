import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() progress: number = 0;
  @Input() showPercentage: boolean = true;
  @Input() height: string = '8px';
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';

  get progressColor(): 'primary' | 'accent' | 'warn' {
    if (this.progress === 100) {
      return 'accent';
    }
    return this.color;
  }
}
