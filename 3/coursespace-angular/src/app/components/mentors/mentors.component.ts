import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Mentor } from '../../models/types';
import { MENTORS } from '../../data/mock-data';

@Component({
  selector: 'app-mentors',
  standalone: false,
  templateUrl: './mentors.component.html',
  styleUrls: ['./mentors.component.css']
})
export class MentorsComponent implements OnInit {
  mentors: Mentor[] = MENTORS;
  currentIndex = 0;
  slidesToShow = 3;
  isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.updateSlidesToShow();
      window.addEventListener('resize', () => this.updateSlidesToShow());
    }
  }

  updateSlidesToShow(): void {
    if (window.innerWidth < 640) {
      this.slidesToShow = 1;
    } else if (window.innerWidth < 1024) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 3;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.mentors.length - this.slidesToShow);
  }

  nextSlide(): void {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToSlide(index: number): void {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
  }
}
