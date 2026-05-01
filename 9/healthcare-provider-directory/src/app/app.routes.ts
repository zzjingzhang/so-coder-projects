import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorDetailComponent } from './components/doctor-detail/doctor-detail.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'doctor/:id', component: DoctorDetailComponent },
  { path: 'appointment/:doctorId', component: AppointmentComponent }
];
