import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ProgressBarComponent } from '../../../shared/progress-bar/progress-bar.component';
import { CourseService } from '../../../services/course.service';
import { Course, Chapter, Lesson } from '../../../models/course.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatCardModule,
    MatCheckboxModule,
    ProgressBarComponent
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  currentLesson: Lesson | undefined;
  currentChapter: Chapter | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const courseId = params.get('id');
        if (courseId) {
          this.loadCourse(courseId);
        }
      }
    });
  }

  loadCourse(courseId: string): void {
    this.courseService.getCourseById(courseId).subscribe({
      next: (course) => {
        this.course = course;
        if (course) {
          const firstChapter = course.chapters.find(ch => ch.expanded);
          if (firstChapter && firstChapter.lessons.length > 0) {
            this.selectLesson(firstChapter, firstChapter.lessons[0]);
          }
        }
      }
    });
  }

  selectLesson(chapter: Chapter, lesson: Lesson): void {
    this.currentChapter = chapter;
    this.currentLesson = lesson;
  }

  toggleChapterExpansion(chapter: Chapter): void {
    if (!this.course) return;
    
    this.courseService.toggleChapterExpansion(this.course.id, chapter.id).subscribe({
      next: (updatedCourse) => {
        if (updatedCourse) {
          this.course = updatedCourse;
        }
      }
    });
  }

  toggleLessonCompletion(chapter: Chapter, lesson: Lesson): void {
    if (!this.course) return;

    this.courseService.toggleLessonCompletion(this.course.id, chapter.id, lesson.id).subscribe({
      next: (updatedCourse) => {
        if (updatedCourse) {
          this.course = updatedCourse;
        }
      }
    });
  }

  get totalDuration(): string {
    if (!this.course) return '0 分钟';
    let totalMinutes = 0;
    this.course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        const parts = lesson.duration.split(':');
        totalMinutes += parseInt(parts[0]) + parseInt(parts[1]) / 60;
      });
    });
    return `${Math.round(totalMinutes)} 分钟`;
  }

  get hasNextLesson(): boolean {
    return this.nextLessonInfo !== undefined;
  }

  get hasPreviousLesson(): boolean {
    return this.previousLessonInfo !== undefined;
  }

  get nextLessonInfo(): { chapter: Chapter; lesson: Lesson } | undefined {
    if (!this.course || !this.currentChapter || !this.currentLesson) return undefined;
    
    const lessons = this.currentChapter.lessons;
    const currentIndex = lessons.findIndex(l => l.id === this.currentLesson?.id);
    
    if (currentIndex < lessons.length - 1) {
      return { chapter: this.currentChapter, lesson: lessons[currentIndex + 1] };
    }
    
    const chapters = this.course.chapters;
    const chapterIndex = chapters.findIndex(ch => ch.id === this.currentChapter?.id);
    
    if (chapterIndex < chapters.length - 1) {
      const nextChapter = chapters[chapterIndex + 1];
      if (nextChapter.lessons.length > 0) {
        return { chapter: nextChapter, lesson: nextChapter.lessons[0] };
      }
    }
    
    return undefined;
  }

  get previousLessonInfo(): { chapter: Chapter; lesson: Lesson } | undefined {
    if (!this.course || !this.currentChapter || !this.currentLesson) return undefined;
    
    const lessons = this.currentChapter.lessons;
    const currentIndex = lessons.findIndex(l => l.id === this.currentLesson?.id);
    
    if (currentIndex > 0) {
      return { chapter: this.currentChapter, lesson: lessons[currentIndex - 1] };
    }
    
    const chapters = this.course.chapters;
    const chapterIndex = chapters.findIndex(ch => ch.id === this.currentChapter?.id);
    
    if (chapterIndex > 0) {
      const prevChapter = chapters[chapterIndex - 1];
      if (prevChapter.lessons.length > 0) {
        return { chapter: prevChapter, lesson: prevChapter.lessons[prevChapter.lessons.length - 1] };
      }
    }
    
    return undefined;
  }

  goToNextLesson(): void {
    if (this.nextLessonInfo) {
      this.selectLesson(this.nextLessonInfo.chapter, this.nextLessonInfo.lesson);
    }
  }

  goToPreviousLesson(): void {
    if (this.previousLessonInfo) {
      this.selectLesson(this.previousLessonInfo.chapter, this.previousLessonInfo.lesson);
    }
  }
}
