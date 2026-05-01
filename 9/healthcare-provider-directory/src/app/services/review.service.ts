import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private reviews: Review[] = [
    {
      id: 1,
      doctorId: 1,
      patientName: 'John Smith',
      rating: 5,
      date: '2026-04-15',
      title: 'Excellent cardiologist!',
      content: 'Dr. Johnson is an amazing doctor. She took the time to explain everything clearly and made me feel at ease. Highly recommend!',
      helpful: 24
    },
    {
      id: 2,
      doctorId: 1,
      patientName: 'Maria Rodriguez',
      rating: 5,
      date: '2026-04-10',
      title: 'Very thorough and caring',
      content: 'I was nervous about my heart condition, but Dr. Johnson was so thorough and caring. She answered all my questions and provided a clear treatment plan.',
      helpful: 18
    },
    {
      id: 3,
      doctorId: 1,
      patientName: 'David Brown',
      rating: 4,
      date: '2026-04-05',
      title: 'Great doctor, long wait time',
      content: 'Dr. Johnson is very knowledgeable and professional. The only downside was the long wait time in the waiting room. Otherwise, excellent care.',
      helpful: 12
    },
    {
      id: 4,
      doctorId: 2,
      patientName: 'Susan Lee',
      rating: 5,
      date: '2026-04-20',
      title: 'Saved my life',
      content: 'Dr. Chen diagnosed my condition quickly and accurately. His expertise and quick action probably saved my life. I can\'t thank him enough!',
      helpful: 31
    },
    {
      id: 5,
      doctorId: 2,
      patientName: 'Robert Kim',
      rating: 4,
      date: '2026-04-12',
      title: 'Very knowledgeable',
      content: 'Dr. Chen is extremely knowledgeable about neurological conditions. He takes the time to explain complex medical terms in simple language.',
      helpful: 15
    },
    {
      id: 6,
      doctorId: 3,
      patientName: 'Jennifer Wilson',
      rating: 5,
      date: '2026-04-18',
      title: 'Amazing with children!',
      content: 'My children absolutely love Dr. Williams! She is so patient, caring, and really knows how to make kids feel comfortable during checkups.',
      helpful: 28
    },
    {
      id: 7,
      doctorId: 3,
      patientName: 'Michael Thompson',
      rating: 5,
      date: '2026-04-08',
      title: 'Best pediatrician in town',
      content: 'We\'ve been seeing Dr. Williams for 5 years now. She is always thorough, attentive, and genuinely cares about her young patients. Highly recommended!',
      helpful: 22
    },
    {
      id: 8,
      doctorId: 5,
      patientName: 'Linda Chen',
      rating: 4,
      date: '2026-04-14',
      title: 'Great dermatologist',
      content: 'Dr. Garcia helped clear up my acne that I\'ve been struggling with for years. She is knowledgeable and provides practical advice for skin care.',
      helpful: 16
    }
  ];

  getReviewsByDoctorId(doctorId: number): Observable<Review[]> {
    const doctorReviews = this.reviews.filter(review => review.doctorId === doctorId);
    return of(doctorReviews);
  }

  getAverageRating(doctorId: number): Observable<number> {
    const doctorReviews = this.reviews.filter(review => review.doctorId === doctorId);
    if (doctorReviews.length === 0) return of(0);
    
    const totalRating = doctorReviews.reduce((sum, review) => sum + review.rating, 0);
    return of(totalRating / doctorReviews.length);
  }
}
