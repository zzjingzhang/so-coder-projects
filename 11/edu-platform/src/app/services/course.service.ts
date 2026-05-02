import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course, Chapter, Lesson } from '../models/course.model';
import { mockCourses } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [...mockCourses];

  constructor() { }

  getAllCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCompletedCourses(): Observable<Course[]> {
    const completed = this.courses.filter(c => c.progress === 100);
    return of(completed);
  }

  toggleLessonCompletion(courseId: string, chapterId: string, lessonId: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return of(undefined);

    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return of(undefined);

    const lesson = chapter.lessons.find(l => l.id === lessonId);
    if (!lesson) return of(undefined);

    lesson.completed = !lesson.completed;
    
    course.completedLessons = course.chapters.reduce((total, ch) => 
      total + ch.lessons.filter(l => l.completed).length, 0);
    course.progress = Math.round((course.completedLessons / course.totalLessons) * 100);

    return of(course);
  }

  toggleChapterExpansion(courseId: string, chapterId: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === courseId);
    if (!course) return of(undefined);

    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return of(undefined);

    chapter.expanded = !chapter.expanded;
    return of(course);
  }
}
