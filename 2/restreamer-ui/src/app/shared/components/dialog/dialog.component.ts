import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

interface DialogButton {
  label: string;
  icon?: string;
  severity?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'help' | 'info';
  disabled?: boolean;
  action?: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: [],
  standalone: false
})
export class DialogComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() header: string = '';
  @Input() width: string = '500px';
  @Input() height: string = 'auto';
  @Input() closable: boolean = true;
  @Input() modal: boolean = true;
  @Input() dismissableMask: boolean = true;
  @Input() styleClass: string = '';
  @Input() buttons: DialogButton[] = [];
  @Input() showFooter: boolean = true;
  @Input() footerAlign: 'left' | 'center' | 'right' = 'right';
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onButtonClick = new EventEmitter<string>();

  ngOnInit(): void {
    if (this.buttons.length === 0) {
      this.buttons = [
        { label: 'Cancel', severity: 'secondary', action: 'cancel' },
        { label: 'Confirm', severity: 'primary', action: 'confirm' }
      ];
    }
  }

  onHide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onClose.emit();
  }

  onButtonClicked(action: string): void {
    this.onButtonClick.emit(action);
    
    if (action === 'cancel' || action === 'close') {
      this.onHide();
    }
  }

  getButtonSeverityClass(severity?: string): string {
    const classes: Record<string, string> = {
      'primary': 'p-button-primary',
      'secondary': 'p-button-secondary',
      'success': 'p-button-success',
      'warning': 'p-button-warning',
      'danger': 'p-button-danger',
      'help': 'p-button-help',
      'info': 'p-button-info'
    };
    return classes[severity || 'primary'] || 'p-button-primary';
  }
}
