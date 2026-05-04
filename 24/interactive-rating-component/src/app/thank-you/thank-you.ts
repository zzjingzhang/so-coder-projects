import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.html',
  standalone: false,
  styleUrl: './thank-you.css'
})
export class ThankYouComponent implements OnInit {
  selectedRating: number = 0;

  constructor(
    private router: Router,
    private ratingService: RatingService
  ) {}

  ngOnInit(): void {
    this.selectedRating = this.ratingService.getRating();
    
    if (this.selectedRating === 0) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
