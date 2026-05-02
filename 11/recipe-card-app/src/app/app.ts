import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recipe-card-app');

  constructor(private router: Router) {}

  goHome(): void {
    this.router.navigate(['/']);
  }
}
