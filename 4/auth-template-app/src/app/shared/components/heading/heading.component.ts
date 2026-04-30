import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-heading',
  standalone: true,
  template: `
    <h1 class="text-2xl sm:text-3xl font-bold text-secondary-900 text-center">{{ text }}</h1>
  `,
  styles: [],
})
export class HeadingComponent {
  @Input() text = '';
}
