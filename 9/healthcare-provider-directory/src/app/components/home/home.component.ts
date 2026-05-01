import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/doctor.service';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    InputSwitchModule,
    FormsModule,
    RatingModule,
    TagModule
  ],
  template: `
    <div class="home-container">
      <div class="filter-section bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Find Your Doctor</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
            <p-dropdown
              [options]="specialties"
              [(ngModel)]="selectedSpecialty"
              placeholder="Select Specialty"
              optionLabel="name"
              optionValue="value"
              [showClear]="true"
              styleClass="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
            <p-dropdown
              [options]="insuranceProviders"
              [(ngModel)]="selectedInsurance"
              placeholder="Select Insurance"
              optionLabel="name"
              optionValue="value"
              [showClear]="true"
              styleClass="w-full"
            />
          </div>
          <div class="flex items-end">
            <div class="flex items-center gap-3">
              <p-inputSwitch [(ngModel)]="showAvailableOnly" (onChange)="applyFilters()" />
              <label class="text-sm font-medium text-gray-700">Show Available Only</label>
            </div>
          </div>
        </div>
        <div class="mt-4 flex justify-end">
          <p-button label="Clear Filters" (click)="clearFilters()" styleClass="p-button-text" />
          <p-button label="Search" (click)="applyFilters()" styleClass="ml-2" />
        </div>
      </div>

      <div class="results-info mb-4">
        <p class="text-gray-600">Showing {{ filteredDoctors.length }} doctors</p>
      </div>

      <div class="doctors-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (doctor of filteredDoctors; track doctor.id) {
          <p-card class="doctor-card hover:shadow-lg transition-shadow duration-300">
            <ng-template pTemplate="header">
              <div class="doctor-header p-4 flex gap-4">
                <img 
                  [src]="doctor.image" 
                  [alt]="doctor.name"
                  class="doctor-image w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <div class="doctor-info flex-1">
                  <h3 class="text-lg font-semibold text-gray-800">{{ doctor.name }}</h3>
                  <p class="text-blue-600 font-medium">{{ doctor.specialty }}</p>
                  <p class="text-gray-500 text-sm">{{ doctor.hospital }}</p>
                </div>
              </div>
            </ng-template>
            <div class="doctor-content">
              <div class="rating-section flex items-center gap-2 mb-3">
                <p-rating [(ngModel)]="doctor.rating" [readonly]="true" [cancel]="false" />
                <span class="text-gray-600">{{ doctor.rating }} ({{ doctor.reviewCount }} reviews)</span>
              </div>
              <div class="details-section mb-3">
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Experience:</span> {{ doctor.experience }} years
                </p>
                <p class="text-sm text-gray-600">
                  <span class="font-medium">Education:</span> {{ doctor.education }}
                </p>
              </div>
              <div class="languages-section mb-3">
                <p-tag 
                  *ngFor="let lang of doctor.languages" 
                  [value]="lang" 
                  styleClass="mr-2 mb-2"
                  severity="info"
                />
              </div>
              <div class="availability-section mb-4">
                @if (doctor.available) {
                  <p-tag value="Available" severity="success" />
                } @else {
                  <p-tag value="Not Available" severity="warning" />
                }
              </div>
              <p class="text-sm text-gray-600 mb-4">
                {{ doctor.about | slice:0:150 }}...
              </p>
            </div>
            <ng-template pTemplate="footer">
              <div class="flex gap-2 justify-end">
                <p-button 
                label="View Details" 
                (click)="viewDetails(doctor.id)" 
                styleClass="p-button-text"
              />
                <p-button 
                label="Book Appointment" 
                (click)="bookAppointment(doctor.id)"
                [disabled]="!doctor.available"
              />
              </div>
            </ng-template>
          </p-card>
        }
      </div>

      @if (filteredDoctors.length === 0) {
        <div class="no-results bg-white p-8 rounded-lg shadow-md text-center">
          <p class="text-gray-500 text-lg">No doctors found matching your criteria.</p>
          <p-button label="Clear Filters" (click)="clearFilters()" styleClass="mt-4" />
        </div>
      }
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  specialties: { name: string; value: string }[] = [];
  insuranceProviders: { name: string; value: string }[] = [];
  selectedSpecialty: string | null = null;
  selectedInsurance: string | null = null;
  showAvailableOnly = false;

  constructor(
    private doctorService: DoctorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
    this.loadInsuranceProviders();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe((doctors) => {
      this.doctors = doctors;
      this.filteredDoctors = doctors;
    });
  }

  loadSpecialties(): void {
    this.doctorService.getSpecialties().subscribe((specialties) => {
      this.specialties = specialties.map(s => ({ name: s, value: s }));
    });
  }

  loadInsuranceProviders(): void {
    this.doctorService.getInsuranceProviders().subscribe((providers) => {
      this.insuranceProviders = providers.map(p => ({ name: p, value: p }));
    });
  }

  applyFilters(): void {
    this.doctorService.searchDoctors(
      this.selectedSpecialty || undefined,
      this.selectedInsurance || undefined,
      this.showAvailableOnly ? true : undefined
    ).subscribe((doctors) => {
      this.filteredDoctors = doctors;
    });
  }

  clearFilters(): void {
    this.selectedSpecialty = null;
    this.selectedInsurance = null;
    this.showAvailableOnly = false;
    this.filteredDoctors = this.doctors;
  }

  viewDetails(doctorId: number): void {
    this.router.navigate(['/doctor', doctorId]);
  }

  bookAppointment(doctorId: number): void {
    this.router.navigate(['/appointment', doctorId]);
  }
}
