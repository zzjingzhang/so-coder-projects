import { Component, Input, ContentChild } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: [],
  standalone: false
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() hint: string = '';
  @Input() errorMessage: string = '';
  @Input() showError: boolean = false;
  @Input() helpText: string = '';
  
  @ContentChild(NgControl) control!: NgControl;

  get hasError(): boolean {
    if (this.showError) return true;
    if (this.control) {
      return this.control.invalid && (this.control.dirty || this.control.touched) || false;
    }
    return false;
  }

  get errorMessages(): string {
    if (this.errorMessage) return this.errorMessage;
    
    if (this.control && this.control.errors) {
      const errors = this.control.errors;
      
      if (errors['required']) {
        return 'This field is required';
      }
      if (errors['email']) {
        return 'Please enter a valid email address';
      }
      if (errors['minlength']) {
        return `Minimum length is ${errors['minlength'].requiredLength} characters`;
      }
      if (errors['maxlength']) {
        return `Maximum length is ${errors['maxlength'].requiredLength} characters`;
      }
      if (errors['pattern']) {
        return 'Invalid format';
      }
    }
    return 'Invalid value';
  }
}
