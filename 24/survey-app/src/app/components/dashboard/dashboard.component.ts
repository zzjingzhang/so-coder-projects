import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { SurveyService } from '../../services/survey.service';
import { Survey, SurveyStatus } from '../../models/survey.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: User | null = null;
  draftSurveys: Survey[] = [];
  openSurveys: Survey[] = [];
  closedSurveys: Survey[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private surveyService: SurveyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });

    this.surveyService.getSurveys().subscribe(surveys => {
      this.draftSurveys = surveys.filter(s => s.status === SurveyStatus.DRAFT);
      this.openSurveys = surveys.filter(s => s.status === SurveyStatus.OPEN);
      this.closedSurveys = surveys.filter(s => s.status === SurveyStatus.CLOSED);
      this.isLoading = false;
    });
  }

  isCoordinator(): boolean {
    return this.authService.isCoordinator();
  }

  isRespondent(): boolean {
    return this.authService.isRespondent();
  }

  createSurvey(): void {
    this.router.navigate(['/survey/create']);
  }

  viewOpenSurveys(): void {
    this.router.navigate(['/surveys/open']);
  }

  viewClosedSurveys(): void {
    this.router.navigate(['/surveys/closed']);
  }
}
