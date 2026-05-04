import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private selectedRating: number = 0;

  constructor() { }

  setRating(rating: number): void {
    this.selectedRating = rating;
  }

  getRating(): number {
    return this.selectedRating;
  }
}
