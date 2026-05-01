import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sampleCharacters = ['永', '和', '书', '法', '墨', '韵'];

  constructor(private router: Router) {}

  startCalligraphy(): void {
    this.router.navigate(['/calligraphy']);
  }
}
