import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  standalone: false
})
export class CardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = false;
  @Input() hasBorder: boolean = true;
  @Input() hasShadow: boolean = true;
  @Input() hoverable: boolean = false;
  @Input() clickable: boolean = false;
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() headerActions: boolean = false;
  
  @Output() cardClick = new EventEmitter<void>();
  @Output() actionClick = new EventEmitter<string>();

  getPaddingClass(): string {
    const paddings: Record<string, string> = {
      'none': 'p-0',
      'small': 'p-3',
      'medium': 'p-5',
      'large': 'p-8'
    };
    return paddings[this.padding] || paddings['medium'];
  }

  getHeaderPaddingClass(): string {
    const paddings: Record<string, string> = {
      'none': 'px-0 pt-0',
      'small': 'px-3 pt-3',
      'medium': 'px-5 pt-5',
      'large': 'px-8 pt-8'
    };
    return paddings[this.padding] || paddings['medium'];
  }

  onCardClick(): void {
    if (this.clickable) {
      this.cardClick.emit();
    }
  }

  onAction(action: string): void {
    this.actionClick.emit(action);
  }
}
