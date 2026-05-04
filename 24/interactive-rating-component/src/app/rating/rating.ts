import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.html',
  standalone: false,
  styleUrl: './rating.css'
})
export class RatingComponent {
  selectedRating: number = 0;
  ratings: number[] = [1, 2, 3, 4, 5];

  constructor(
    private router: Router,
    private ratingService: RatingService
  ) {}

  selectRating(rating: number): void {
    this.selectedRating = rating;
  }

  submitRating(): void {
    if (this.selectedRating > 0) {
      this.ratingService.setRating(this.selectedRating);
      this.router.navigate(['/thank-you']);
    }
  }

  isSelected(rating: number): boolean {
    return this.selectedRating === rating;
  }
}
