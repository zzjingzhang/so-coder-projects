import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SurveyService } from '../../services/survey.service';
import { SurveyResponseService } from '../../services/survey-response.service';
import { AuthService } from '../../services/auth.service';
import { Survey, SurveyStatus } from '../../models/survey.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.css']
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];
  currentUser: User | null = null;
  isLoading = true;
  listType: 'open' | 'closed' = 'open';
  completedSurveyIds: Set<string> = new Set();

  constructor(
    private surveyService: SurveyService,
    private surveyResponseService: SurveyResponseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
      this.loadCompletedSurveys(user.id);
    });

    this.route.data.subscribe(data => {
      this.listType = data['type'] || 'open';
      this.loadSurveys();
    });
  }

  loadSurveys(): void {
    const status = this.listType === 'open' ? SurveyStatus.OPEN : SurveyStatus.CLOSED;
    
    this.surveyService.getSurveysByStatus(status).subscribe({
      next: (surveys) => {
        this.surveys = surveys;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadCompletedSurveys(userId: string): void {
    this.surveyResponseService.responses$.subscribe(responses => {
      this.completedSurveyIds = new Set(
        responses
          .filter(r => r.respondentId === userId)
          .map(r => r.surveyId)
      );
    });
  }

  isCoordinator(): boolean {
    return this.authService.isCoordinator();
  }

  isRespondent(): boolean {
    return this.authService.isRespondent();
  }

  hasCompletedSurvey(surveyId: string): boolean {
    return this.completedSurveyIds.has(surveyId);
  }

  takeSurvey(surveyId: string): void {
    if (!this.hasCompletedSurvey(surveyId)) {
      this.router.navigate(['/survey/take', surveyId]);
    }
  }

  viewResults(surveyId: string): void {
    this.router.navigate(['/survey/results', surveyId]);
  }

  manageSurvey(surveyId: string): void {
    this.router.navigate(['/survey/manage', surveyId]);
  }

  getStatusBadgeClass(): string {
    return this.listType === 'open' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  }

  getStatusIcon(): string {
    return this.listType === 'open' ? 'public' : 'check_circle';
  }

  getPageTitle(): string {
    return this.listType === 'open' ? '开放调查' : '已关闭调查';
  }

  getPageSubtitle(): string {
    return this.listType === 'open' 
      ? '选择一个调查参与或管理' 
      : '查看已完成调查的结果';
  }
}
