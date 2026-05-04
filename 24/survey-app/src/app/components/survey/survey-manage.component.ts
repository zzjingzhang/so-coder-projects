import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Survey, SurveyStatus } from '../../models/survey.model';

@Component({
  selector: 'app-survey-manage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './survey-manage.component.html',
  styleUrls: ['./survey-manage.component.css']
})
export class SurveyManageComponent implements OnInit {
  survey: Survey | null = null;
  isLoading = true;
  isProcessing = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private surveyService: SurveyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isCoordinator()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.loadSurvey(surveyId);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  loadSurvey(id: string): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (survey) => {
        this.survey = survey || null;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = '加载调查失败';
      }
    });
  }

  openSurvey(): void {
    if (!this.survey) return;

    this.isProcessing = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.surveyService.openSurvey(this.survey.id).subscribe({
      next: (updated) => {
        this.isProcessing = false;
        if (updated) {
          this.survey = updated;
          this.successMessage = '调查已成功开放，用户现在可以参与了';
          setTimeout(() => this.successMessage = '', 5000);
        }
      },
      error: () => {
        this.isProcessing = false;
        this.errorMessage = '开放调查失败，请重试';
      }
    });
  }

  closeSurvey(): void {
    if (!this.survey) return;

    this.isProcessing = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.surveyService.closeSurvey(this.survey.id).subscribe({
      next: (updated) => {
        this.isProcessing = false;
        if (updated) {
          this.survey = updated;
          this.successMessage = '调查已成功关闭，结果已保存';
          setTimeout(() => this.successMessage = '', 5000);
        }
      },
      error: () => {
        this.isProcessing = false;
        this.errorMessage = '关闭调查失败，请重试';
      }
    });
  }

  editSurvey(): void {
    if (this.survey) {
      this.router.navigate(['/survey/edit', this.survey.id]);
    }
  }

  viewResults(): void {
    if (this.survey) {
      this.router.navigate(['/survey/results', this.survey.id]);
    }
  }

  goBack(): void {
    this.router.navigate(['/surveys/open']);
  }

  isDraft(): boolean {
    return this.survey?.status === SurveyStatus.DRAFT;
  }

  isOpen(): boolean {
    return this.survey?.status === SurveyStatus.OPEN;
  }

  isClosed(): boolean {
    return this.survey?.status === SurveyStatus.CLOSED;
  }

  getStatusClass(): string {
    if (this.isDraft()) return 'bg-orange-100 text-orange-800';
    if (this.isOpen()) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  }

  getStatusText(): string {
    if (this.isDraft()) return '草稿';
    if (this.isOpen()) return '开放中';
    return '已关闭';
  }

  getStatusIcon(): string {
    if (this.isDraft()) return 'draft';
    if (this.isOpen()) return 'public';
    return 'check_circle';
  }
}
