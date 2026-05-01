import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HeroCardComponent } from './hero-card.component';
import { HEROES } from './hero.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    HeroCardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'Superhero Scroll Showcase';
  heroes = HEROES;

  getDelay(index: number): '100' | '200' | '300' {
    const delays: ('100' | '200' | '300')[] = ['100', '200', '300'];
    return delays[index % 3];
  }
}
