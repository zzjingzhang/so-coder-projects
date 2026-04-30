import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paragraph',
  standalone: true,
  template: `
    <p class="text-secondary-600 text-center text-sm sm:text-base">{{ text }}</p>
  `,
  styles: [],
})
export class ParagraphComponent {
  @Input() text = '';
}
