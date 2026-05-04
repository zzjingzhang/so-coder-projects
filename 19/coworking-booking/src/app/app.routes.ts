import { Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
  { path: '', component: RoomListComponent, pathMatch: 'full' },
  { path: 'booking/:id', component: BookingComponent },
  { path: '**', redirectTo: '' }
];
