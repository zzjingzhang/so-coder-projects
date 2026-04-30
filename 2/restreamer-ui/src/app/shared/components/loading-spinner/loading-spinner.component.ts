import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: [],
  standalone: false
})
export class LoadingSpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() overlay: boolean = false;
  @Input() fullScreen: boolean = false;
  @Input() message: string = '';
  getSizeClass(): string {
    switch (this.size) {
      case 'small':
        return 'w-6 h-6';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  }
}
