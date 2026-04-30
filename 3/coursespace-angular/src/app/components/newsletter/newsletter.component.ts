import { Component } from '@angular/core';

@Component({
  selector: 'app-newsletter',
  standalone: false,
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  email = '';
  isSubmitting = false;
  isHoverEnabled = true;

  onSubmit(): void {
    if (!this.email) {
      return;
    }
    
    this.isSubmitting = true;
    
    setTimeout(() => {
      console.log('Subscribing email:', this.email);
      this.email = '';
      this.isSubmitting = false;
    }, 1000);
  }
}
