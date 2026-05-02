import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';
import { CourseCardComponent } from '../../shared/course-card/course-card.component';
import { ProgressBarComponent } from '../../shared/progress-bar/progress-bar.component';
import { UserService } from '../../services/user.service';
import { CourseService } from '../../services/course.service';
import { AchievementService } from '../../services/achievement.service';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { Achievement } from '../../models/achievement.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatBadgeModule,
    CourseCardComponent,
    ProgressBarComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: User | undefined;
  courses: Course[] = [];
  achievements: Achievement[] = [];
  activeTabIndex: number = 0;

  constructor(
    private userService: UserService,
    private courseService: CourseService,
    private achievementService: AchievementService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCourses();
    this.loadAchievements();
  }

  loadUserData(): void {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  loadCourses(): void {
    this.courseService.getEnrolledCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      }
    });
  }

  loadAchievements(): void {
    this.achievementService.getAllAchievements().subscribe({
      next: (achievements) => {
        this.achievements = achievements;
      }
    });
  }

  get earnedAchievements(): Achievement[] {
    return this.achievements.filter(a => a.earned);
  }

  get lockedAchievements(): Achievement[] {
    return this.achievements.filter(a => !a.earned);
  }

  get completedCourses(): Course[] {
    return this.courses.filter(c => c.progress === 100);
  }

  get inProgressCourses(): Course[] {
    return this.courses.filter(c => c.progress > 0 && c.progress < 100);
  }

  getAchievementCategoryName(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'learning': '学习成就',
      'streak': '连续学习',
      'social': '社交成就',
      'milestone': '里程碑'
    };
    return categoryMap[category] || category;
  }

  getAchievementCategoryIcon(category: string): string {
    const iconMap: { [key: string]: string } = {
      'learning': 'menu_book',
      'streak': 'fire',
      'social': 'group',
      'milestone': 'emoji_events'
    };
    return iconMap[category] || 'star';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
