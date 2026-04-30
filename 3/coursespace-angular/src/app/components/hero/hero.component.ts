import { Component } from '@angular/core';
import { Stat } from '../../models/types';
import { STATS } from '../../data/mock-data';

@Component({
  selector: 'app-hero',
  standalone: false,
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  stats: Stat[] = STATS;

  scrollToCourses(): void {
    const element = document.getElementById('courses');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  watchVideo(): void {
    console.log('Opening video modal...');
  }
}
