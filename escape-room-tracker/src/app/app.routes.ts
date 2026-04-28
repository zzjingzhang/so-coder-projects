import { Routes } from '@angular/router';
import { RoomsComponent } from './rooms/rooms.component';
import { RecordsComponent } from './records/records.component';

export const routes: Routes = [
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: 'rooms', component: RoomsComponent, title: '场馆档案' },
  { path: 'records', component: RecordsComponent, title: '通关记录' },
  { path: '**', redirectTo: '/rooms' }
];
