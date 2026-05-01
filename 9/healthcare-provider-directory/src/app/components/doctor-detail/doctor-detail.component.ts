import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { Review } from '../../models/review.model';
import { DoctorService } from '../../services/doctor.service';
import { ReviewService } from '../../services/review.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { DividerModule } from 'primeng/divider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctor-detail',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    RatingModule,
    TagModule,
    TabViewModule,
    DividerModule,
    InputTextareaModule,
    InputNumberModule,
    FormsModule
  ],
  template: `
    @if (doctor) {
      <div class="doctor-detail-container">
        <button 
          pButton 
          icon="pi pi-arrow-left" 
          label="Back to Search" 
          (click)="goBack()"
          styleClass="p-button-text mb-4"
        />

        <div class="doctor-profile-card bg-white rounded-lg shadow-md overflow-hidden">
          <div class="doctor-header bg-gradient-to-r from-blue-500 to-blue-600 p-6">
            <div class="flex flex-col md:flex-row items-center gap-6">
              <img 
                [src]="doctor.image" 
                [alt]="doctor.name"
                class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div class="text-center md:text-left flex-1">
                <h1 class="text-2xl font-bold text-white mb-2">{{ doctor.name }}</h1>
                <p class="text-blue-100 text-lg mb-2">{{ doctor.specialty }}</p>
                <p class="text-blue-100">{{ doctor.hospital }}</p>
                <div class="flex items-center justify-center md:justify-start gap-2 mt-3">
                  <p-rating [(ngModel)]="doctor.rating" [readonly]="true" [cancel]="false" />
                  <span class="text-white">{{ doctor.rating }} ({{ doctor.reviewCount }} reviews)</span>
                </div>
              </div>
              <div class="text-center">
                @if (doctor.available) {
                  <p-tag value="Available Now" severity="success" styleClass="text-lg px-4 py-2" />
                } @else {
                  <p-tag value="Not Available" severity="warning" styleClass="text-lg px-4 py-2" />
                }
                <p class="text-white mt-2">Next available: {{ doctor.nextAvailable }}</p>
                <p-button 
                  label="Book Appointment" 
                  (click)="bookAppointment()"
                  [disabled]="!doctor.available"
                  styleClass="mt-3 w-full"
                  size="large"
                />
              </div>
            </div>
          </div>

          <div class="p-6">
            <p-tabView>
              <p-tabPanel header="About">
                <div class="about-section">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">About {{ doctor.name }}</h3>
                  <p class="text-gray-600 leading-relaxed mb-6">{{ doctor.about }}</p>
                  
                  <p-divider />
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-3">Experience & Education</h4>
                      <div class="space-y-2">
                        <p class="text-gray-600">
                          <span class="font-medium">Experience:</span> {{ doctor.experience }} years
                        </p>
                        <p class="text-gray-600">
                          <span class="font-medium">Education:</span> {{ doctor.education }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 class="font-semibold text-gray-800 mb-3">Languages Spoken</h4>
                      <div class="flex flex-wrap gap-2">
                        @for (lang of doctor.languages; track lang) {
                          <p-tag [value]="lang" severity="info" />
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </p-tabPanel>

              <p-tabPanel header="Insurance">
                <div class="insurance-section">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">Accepted Insurance Plans</h3>
                  <p class="text-gray-600 mb-4">{{ doctor.name }} accepts the following insurance plans:</p>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    @for (insurance of doctor.insurance; track insurance) {
                      <div class="insurance-card bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                        <span class="text-2xl">🏥</span>
                        <span class="text-gray-800 font-medium">{{ insurance }}</span>
                      </div>
                    }
                  </div>
                  <p-divider />
                  <div class="insurance-info bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-gray-800 mb-2">Insurance Information</h4>
                    <p class="text-gray-600 text-sm">
                      Please bring your insurance card to your appointment. If you don't see your insurance listed, 
                      please contact our office to discuss payment options. We accept most major insurance plans 
                      and offer flexible payment arrangements for uninsured patients.
                    </p>
                  </div>
                </div>
              </p-tabPanel>

              <p-tabPanel [header]="'Reviews (' + reviews.length + ')'">
                <div class="reviews-section">
                  <h3 class="text-xl font-semibold text-gray-800 mb-4">Patient Reviews</h3>
                  
                  @if (reviews.length > 0) {
                    <div class="reviews-list space-y-6">
                      @for (review of reviews; track review.id) {
                        <div class="review-card bg-gray-50 rounded-lg p-5">
                          <div class="review-header flex justify-between items-start mb-3">
                            <div>
                              <h4 class="font-semibold text-gray-800">{{ review.title }}</h4>
                              <p class="text-sm text-gray-500">by {{ review.patientName }} on {{ review.date }}</p>
                            </div>
                            <p-rating [(ngModel)]="review.rating" [readonly]="true" [cancel]="false" />
                          </div>
                          <p class="text-gray-600 leading-relaxed">{{ review.content }}</p>
                          <div class="helpful-section mt-3 flex items-center gap-2 text-sm text-gray-500">
                            <span>👍 {{ review.helpful }} people found this helpful</span>
                          </div>
                        </div>
                      }
                    </div>
                  } @else {
                    <div class="no-reviews text-center py-8">
                      <p class="text-gray-500">No reviews yet for this doctor.</p>
                    </div>
                  }

                  <p-divider />

                  <div class="write-review-section">
                    <h4 class="font-semibold text-gray-800 mb-4">Write a Review</h4>
                    <div class="bg-gray-50 p-5 rounded-lg">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                          <input 
                            type="text" 
                            [(ngModel)]="newReview.patientName"
                            placeholder="Enter your name"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                          <p-rating [(ngModel)]="newReview.rating" [cancel]="false" />
                        </div>
                      </div>
                      <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
                        <input 
                          type="text" 
                          [(ngModel)]="newReview.title"
                          placeholder="Summarize your experience"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                        <textarea 
                          [(ngModel)]="newReview.content"
                          rows="4"
                          placeholder="Share your experience with this doctor..."
                          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>
                      <div class="flex justify-end">
                        <p-button 
                          label="Submit Review" 
                          (click)="submitReview()"
                          [disabled]="!canSubmitReview()"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </p-tabPanel>
            </p-tabView>
          </div>
        </div>
      </div>
    } @else {
      <div class="loading-container text-center py-12">
        <p class="text-gray-500">Loading doctor information...</p>
      </div>
    }
  `,
  styles: []
})
export class DoctorDetailComponent implements OnInit {
  doctor: Doctor | undefined;
  reviews: Review[] = [];
  newReview: { patientName: string; rating: number; title: string; content: string } = {
    patientName: '',
    rating: 5,
    title: '',
    content: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.loadDoctor(parseInt(doctorId, 10));
      this.loadReviews(parseInt(doctorId, 10));
    }
  }

  loadDoctor(id: number): void {
    this.doctorService.getDoctorById(id).subscribe((doctor) => {
      this.doctor = doctor;
    });
  }

  loadReviews(doctorId: number): void {
    this.reviewService.getReviewsByDoctorId(doctorId).subscribe((reviews) => {
      this.reviews = reviews;
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  bookAppointment(): void {
    if (this.doctor) {
      this.router.navigate(['/appointment', this.doctor.id]);
    }
  }

  canSubmitReview(): boolean {
    return (
      this.newReview.patientName.trim().length > 0 &&
      this.newReview.rating > 0 &&
      this.newReview.title.trim().length > 0 &&
      this.newReview.content.trim().length > 0
    );
  }

  submitReview(): void {
    if (this.canSubmitReview() && this.doctor) {
      const newReview: Review = {
        id: this.reviews.length + 1,
        doctorId: this.doctor.id,
        patientName: this.newReview.patientName,
        rating: this.newReview.rating,
        date: new Date().toISOString().split('T')[0],
        title: this.newReview.title,
        content: this.newReview.content,
        helpful: 0
      };
      this.reviews.unshift(newReview);
      this.newReview = { patientName: '', rating: 5, title: '', content: '' };
    }
  }
}
