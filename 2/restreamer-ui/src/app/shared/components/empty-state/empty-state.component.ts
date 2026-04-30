import { Component, Input, Output, EventEmitter } from '@angular/core';

type EmptyStateIcon = 'search' | 'document' | 'folder' | 'video' | 'user' | 'settings' | 'network' | 'custom';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: [],
  standalone: false
})
export class EmptyStateComponent {
  @Input() icon: EmptyStateIcon = 'document';
  @Input() customIcon: string = '';
  @Input() title: string = 'No data available';
  @Input() description: string = '';
  @Input() actionLabel: string = '';
  @Input() actionIcon: string = '';
  @Input() showAction: boolean = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  
  @Output() actionClick = new EventEmitter<void>();

  getIconClass(): string {
    const icons: Record<EmptyStateIcon, string> = {
      'search': 'pi pi-search',
      'document': 'pi pi-file',
      'folder': 'pi pi-folder',
      'video': 'pi pi-video',
      'user': 'pi pi-user',
      'settings': 'pi pi-cog',
      'network': 'pi pi-globe',
      'custom': this.customIcon
    };
    return icons[this.icon] || icons['document'];
  }

  getIconSizeClass(): string {
    const sizes: Record<string, string> = {
      'small': 'w-12 h-12 text-3xl',
      'medium': 'w-16 h-16 text-4xl',
      'large': 'w-20 h-20 text-5xl'
    };
    return sizes[this.size] || sizes['medium'];
  }

  onAction(): void {
    this.actionClick.emit();
  }
}
