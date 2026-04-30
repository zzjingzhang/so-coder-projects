import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

interface ConfirmDialogConfig {
  header: string;
  message: string;
  icon?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptIcon?: string;
  rejectIcon?: string;
  acceptButtonStyleClass?: string;
  rejectButtonStyleClass?: string;
  defaultFocus?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [],
  standalone: false
})
export class ConfirmDialogComponent {
  @Input() visible: boolean = false;
  @Input() header: string = 'Confirm';
  @Input() message: string = 'Are you sure?';
  @Input() icon: string = 'pi pi-exclamation-triangle';
  @Input() acceptLabel: string = 'Yes';
  @Input() rejectLabel: string = 'No';
  @Input() acceptButtonStyleClass: string = 'p-button-danger';
  @Input() rejectButtonStyleClass: string = 'p-button-text';
  @Input() closable: boolean = true;
  
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() onAccept = new EventEmitter<void>();
  @Output() onReject = new EventEmitter<void>();

  constructor(private confirmationService: ConfirmationService) {}

  show(config: ConfirmDialogConfig): void {
    this.header = config.header || this.header;
    this.message = config.message || this.message;
    this.icon = config.icon || this.icon;
    this.acceptLabel = config.acceptLabel || this.acceptLabel;
    this.rejectLabel = config.rejectLabel || this.rejectLabel;
    this.acceptButtonStyleClass = config.acceptButtonStyleClass || this.acceptButtonStyleClass;
    this.rejectButtonStyleClass = config.rejectButtonStyleClass || this.rejectButtonStyleClass;
    
    this.visible = true;
    this.visibleChange.emit(true);
  }

  hide(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  accept(): void {
    this.onAccept.emit();
    this.hide();
  }

  reject(): void {
    this.onReject.emit();
  }

  onClose(): void {
    if (this.closable) {
      this.reject();
    }
  }
}
