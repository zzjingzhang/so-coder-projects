import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/courses/courses-list/courses-list.component';
import { CourseDetailComponent } from './pages/courses/course-detail/course-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesListComponent },
  { path: 'courses/:id', component: CourseDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '**', redirectTo: '/courses' }
];
