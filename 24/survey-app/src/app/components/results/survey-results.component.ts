import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BaseChartDirective } from 'ng2-charts';
import { SurveyService } from '../../services/survey.service';
import { SurveyResponseService } from '../../services/survey-response.service';
import { AuthService } from '../../services/auth.service';
import { Survey } from '../../models/survey.model';
import { QuestionResult } from '../../models/survey-response.model';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-survey-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    BaseChartDirective
  ],
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
export class SurveyResultsComponent implements OnInit {
  survey: Survey | null = null;
  results: QuestionResult[] = [];
  isLoading = true;
  chartType: ChartType = 'bar';
  pieChartType: ChartType = 'pie';

  constructor(
    private surveyService: SurveyService,
    private surveyResponseService: SurveyResponseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.loadSurvey(surveyId);
      this.loadResults(surveyId);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  loadSurvey(id: string): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (survey) => {
        this.survey = survey || null;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadResults(id: string): void {
    this.surveyResponseService.getSurveyResults(id).subscribe({
      next: (results) => {
        this.results = results;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getBarChartData(result: QuestionResult): ChartConfiguration['data'] {
    return {
      labels: result.optionResults.map(o => o.optionText),
      datasets: [{
        data: result.optionResults.map(o => o.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 1
      }]
    };
  }

  getPieChartData(result: QuestionResult): ChartConfiguration['data'] {
    return {
      labels: result.optionResults.map(o => o.optionText),
      datasets: [{
        data: result.optionResults.map(o => o.count),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: 'white',
        borderWidth: 2
      }]
    };
  }

  getChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    };
  }

  getPieChartOptions(): ChartConfiguration['options'] {
    return {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    };
  }

  getPercentage(count: number, total: number): string {
    if (total === 0) return '0%';
    return ((count / total * 100).toFixed(1) + '%';
  }

  goBack(): void {
    this.router.navigate(['/surveys/closed']);
  }

  hasResponses(): boolean {
    return this.results.length > 0 && this.results[0].totalResponses > 0;
  }
}
