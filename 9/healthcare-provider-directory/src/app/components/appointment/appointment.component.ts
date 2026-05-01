import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Doctor } from '../../models/doctor.model';
import { Appointment } from '../../models/appointment.model';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    TagModule,
    DividerModule,
    ToastModule
  ],
  template: `
    <div class="appointment-container">
      <button 
        pButton 
        icon="pi pi-arrow-left" 
        label="Back" 
        (click)="goBack()"
        styleClass="p-button-text mb-4"
      />

      @if (doctor) {
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-1">
            <p-card>
              <ng-template pTemplate="header">
                <div class="doctor-info p-4 text-center">
                  <img 
                    [src]="doctor.image" 
                    [alt]="doctor.name"
                    class="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-blue-100"
                  />
                  <h3 class="text-lg font-semibold text-gray-800">{{ doctor.name }}</h3>
                  <p class="text-blue-600">{{ doctor.specialty }}</p>
                  <p class="text-gray-500 text-sm">{{ doctor.hospital }}</p>
                </div>
              </ng-template>
              <div class="insurance-info">
                <h4 class="font-semibold text-gray-800 mb-3">Accepted Insurance</h4>
                <div class="flex flex-wrap gap-2">
                  @for (insurance of doctor.insurance; track insurance) {
                    <p-tag [value]="insurance" severity="info" />
                  }
                </div>
              </div>
              <p-divider />
              <div class="languages-info">
                <h4 class="font-semibold text-gray-800 mb-3">Languages</h4>
                <div class="flex flex-wrap gap-2">
                  @for (lang of doctor.languages; track lang) {
                    <p-tag [value]="lang" />
                  }
                </div>
              </div>
            </p-card>
          </div>

          <div class="lg:col-span-2">
            <p-card header="Book Appointment">
              <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
                <div class="personal-info-section mb-6">
                  <h4 class="font-semibold text-gray-800 mb-4">Personal Information</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input 
                        type="text" 
                        pInputText 
                        formControlName="patientName"
                        placeholder="Enter your full name"
                        class="w-full"
                      />
                      @if (appointmentForm.get('patientName')?.invalid && appointmentForm.get('patientName')?.touched) {
                        <small class="text-red-500">Name is required</small>
                      }
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input 
                        type="email" 
                        pInputText 
                        formControlName="patientEmail"
                        placeholder="Enter your email"
                        class="w-full"
                      />
                      @if (appointmentForm.get('patientEmail')?.invalid && appointmentForm.get('patientEmail')?.touched) {
                        <small class="text-red-500">Valid email is required</small>
                      }
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input 
                        type="tel" 
                        pInputText 
                        formControlName="patientPhone"
                        placeholder="Enter your phone number"
                        class="w-full"
                      />
                      @if (appointmentForm.get('patientPhone')?.invalid && appointmentForm.get('patientPhone')?.touched) {
                        <small class="text-red-500">Phone number is required</small>
                      }
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Insurance Provider *</label>
                      <p-dropdown 
                        formControlName="insurance"
                        [options]="insuranceOptions"
                        placeholder="Select your insurance"
                        optionLabel="name"
                        optionValue="value"
                        styleClass="w-full"
                      />
                      @if (appointmentForm.get('insurance')?.invalid && appointmentForm.get('insurance')?.touched) {
                        <small class="text-red-500">Insurance is required</small>
                      }
                    </div>
                  </div>
                </div>

                <p-divider />

                <div class="appointment-details-section mb-6">
                  <h4 class="font-semibold text-gray-800 mb-4">Appointment Details</h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Date *</label>
                      <p-calendar 
                        formControlName="date"
                        [minDate]="minDate"
                        [disabledDates]="disabledDates"
                        placeholder="Select a date"
                        dateFormat="yy-mm-dd"
                        styleClass="w-full"
                      />
                      @if (appointmentForm.get('date')?.invalid && appointmentForm.get('date')?.touched) {
                        <small class="text-red-500">Date is required</small>
                      }
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Time *</label>
                      <p-dropdown 
                        formControlName="time"
                        [options]="availableTimes"
                        placeholder="Select a time"
                        optionLabel="label"
                        optionValue="value"
                        styleClass="w-full"
                      />
                      @if (appointmentForm.get('time')?.invalid && appointmentForm.get('time')?.touched) {
                        <small class="text-red-500">Time is required</small>
                      }
                    </div>
                  </div>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Reason for Visit *</label>
                    <textarea 
                      pInputTextarea 
                      formControlName="reason"
                      [rows]="4"
                      placeholder="Please describe the reason for your appointment..."
                      class="w-full"
                    ></textarea>
                    @if (appointmentForm.get('reason')?.invalid && appointmentForm.get('reason')?.touched) {
                      <small class="text-red-500">Reason is required</small>
                    }
                  </div>
                </div>

                <p-divider />

                <div class="form-actions flex justify-end gap-3">
                  <p-button 
                    label="Cancel" 
                    (click)="goBack()"
                    styleClass="p-button-text"
                    type="button"
                  />
                  <p-button 
                    label="Book Appointment" 
                    [disabled]="!appointmentForm.valid"
                    type="submit"
                  />
                </div>
              </form>
            </p-card>
          </div>
        </div>
      } @else {
        <div class="loading-container text-center py-12">
          <p class="text-gray-500">Loading...</p>
        </div>
      }

      <p-toast />
    </div>
  `,
  styles: [],
  providers: [MessageService]
})
export class AppointmentComponent implements OnInit {
  doctor: Doctor | undefined;
  appointmentForm: FormGroup;
  insuranceOptions: { name: string; value: string }[] = [];
  availableTimes: { label: string; value: string }[] = [];
  minDate: Date;
  disabledDates: Date[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
    private messageService: MessageService
  ) {
    this.appointmentForm = this.fb.group({
      patientName: ['', [Validators.required]],
      patientEmail: ['', [Validators.required, Validators.email]],
      patientPhone: ['', [Validators.required]],
      insurance: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() + 1);
    
    this.disabledDates = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() === 0 || date.getDay() === 6) {
        this.disabledDates.push(date);
      }
    }

    this.availableTimes = [
      { label: '08:00 AM', value: '08:00' },
      { label: '09:00 AM', value: '09:00' },
      { label: '10:00 AM', value: '10:00' },
      { label: '11:00 AM', value: '11:00' },
      { label: '02:00 PM', value: '14:00' },
      { label: '03:00 PM', value: '15:00' },
      { label: '04:00 PM', value: '16:00' },
      { label: '05:00 PM', value: '17:00' }
    ];
  }

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get('id');
    if (doctorId) {
      this.loadDoctor(parseInt(doctorId, 10));
    }
  }

  loadDoctor(id: number): void {
    this.doctorService.getDoctorById(id).subscribe((doctor) => {
      this.doctor = doctor;
      if (doctor) {
        this.insuranceOptions = doctor.insurance.map(i => ({ name: i, value: i }));
      }
    });
  }

  goBack(): void {
    if (this.doctor) {
      this.router.navigate(['/doctor', this.doctor.id]);
    } else {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    if (this.appointmentForm.valid && this.doctor) {
      const formValue = this.appointmentForm.value;
      const appointment: Appointment = {
        doctorId: this.doctor.id,
        patientName: formValue.patientName,
        patientEmail: formValue.patientEmail,
        patientPhone: formValue.patientPhone,
        date: formValue.date.toISOString().split('T')[0],
        time: formValue.time,
        reason: formValue.reason,
        insurance: formValue.insurance,
        status: 'pending'
      };

      this.appointmentService.createAppointment(appointment).subscribe((createdAppointment) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Appointment Booked!',
          detail: `Your appointment with ${this.doctor?.name} has been scheduled for ${createdAppointment.date} at ${createdAppointment.time}`,
          life: 5000
        });

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    } else {
      this.markFormGroupTouched(this.appointmentForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}
