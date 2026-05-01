import { Injectable } from '@angular/core';
import { Appointment } from '../models/appointment.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointments: Appointment[] = [];
  private appointmentIdCounter = 1;

  getAvailableSlots(): Observable<{ date: string; times: string[] }[]> {
    const slots: { date: string; times: string[] }[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const times = isWeekend 
        ? ['09:00', '10:00', '11:00', '14:00', '15:00']
        : ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
      
      slots.push({ date: dateString, times });
    }
    
    return of(slots);
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const newAppointment = {
      ...appointment,
      id: this.appointmentIdCounter++,
      status: 'confirmed' as const
    };
    this.appointments.push(newAppointment);
    return of(newAppointment);
  }

  getAppointments(): Observable<Appointment[]> {
    return of([...this.appointments]);
  }

  cancelAppointment(id: number): Observable<boolean> {
    const index = this.appointments.findIndex(appointment => appointment.id === id);
    if (index !== -1) {
      this.appointments[index].status = 'cancelled';
      return of(true);
    }
    return of(false);
  }
}
