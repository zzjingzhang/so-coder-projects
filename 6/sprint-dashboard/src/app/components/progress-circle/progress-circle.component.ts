import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.css'],
  standalone: false
})
export class ProgressCircleComponent {
  @Input() percentage: number = 0;
  @Input() color: string = '#49D9A0';
  @Input() label: string = '';
  @Input() size: number = 120;

  get circumference(): number {
    const radius = (this.size - 20) / 2;
    return 2 * Math.PI * radius;
  }

  get strokeDashoffset(): number {
    return this.circumference - (this.percentage / 100) * this.circumference;
  }

  get radius(): number {
    return (this.size - 20) / 2;
  }

  get center(): number {
    return this.size / 2;
  }
}
