import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CourseCardComponent } from '../../../shared/course-card/course-card.component';
import { CourseService } from '../../../services/course.service';
import { Course } from '../../../models/course.model';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    CourseCardComponent
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.css'
})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  activeTabIndex: number = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    });
  }

  get inProgressCourses(): Course[] {
    return this.courses.filter(c => c.progress > 0 && c.progress < 100);
  }

  get completedCourses(): Course[] {
    return this.courses.filter(c => c.progress === 100);
  }
}
