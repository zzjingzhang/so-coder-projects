import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: [],
  standalone: false
})
export class ProgressBarComponent implements OnInit {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() showValue: boolean = true;
  @Input() showLabel: boolean = false;
  @Input() label: string = '';
  @Input() unit: string = '%';
  @Input() severity: 'info' | 'success' | 'warning' | 'danger' = 'info';
  @Input() showAnimation: boolean = true;
  @Input() height: string = '12px';
  @Input() indeterminate: boolean = false;
  
  displayValue: number = 0;

  ngOnInit(): void {
    this.displayValue = Math.min(Math.max(this.value, 0), this.max);
  }

  get percentage(): number {
    return Math.round((this.value / this.max) * 100);
  }

  get severityClass(): string {
    const classes: Record<string, string> = {
      'info': 'bg-blue-500',
      'success': 'bg-green-500',
      'warning': 'bg-yellow-500',
      'danger': 'bg-red-500'
    };
    return classes[this.severity] || classes['info'];
  }

  getStatusFromValue(): string {
    const pct = this.percentage;
    if (pct >= 90) return 'danger';
    if (pct >= 70) return 'warning';
    if (pct >= 50) return 'info';
    return 'success';
  }
}
