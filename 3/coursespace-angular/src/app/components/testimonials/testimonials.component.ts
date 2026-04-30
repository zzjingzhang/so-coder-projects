import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Testimonial } from '../../models/types';
import { TESTIMONIALS } from '../../data/mock-data';

@Component({
  selector: 'app-testimonials',
  standalone: false,
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = TESTIMONIALS;
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
    } else if (window.innerWidth < 768) {
      this.slidesToShow = 2;
    } else {
      this.slidesToShow = 3;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.testimonials.length - this.slidesToShow);
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
    return Array(rating).fill(0);
  }
}
