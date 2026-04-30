import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Course } from '../../models/types';
import { POPULAR_COURSES } from '../../data/mock-data';

@Component({
  selector: 'app-courses-carousel',
  standalone: false,
  templateUrl: './courses-carousel.component.html',
  styleUrls: ['./courses-carousel.component.css']
})
export class CoursesCarouselComponent implements OnInit {
  courses: Course[] = POPULAR_COURSES;
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
    return Math.max(0, this.courses.length - this.slidesToShow);
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

  getStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }
}
