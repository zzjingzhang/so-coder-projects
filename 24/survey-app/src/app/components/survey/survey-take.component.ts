import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { SurveyService } from '../../services/survey.service';
import { SurveyResponseService } from '../../services/survey-response.service';
import { AuthService } from '../../services/auth.service';
import { Survey, SurveyStatus } from '../../models/survey.model';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-survey-take',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  templateUrl: './survey-take.component.html',
  styleUrls: ['./survey-take.component.css']
})
export class SurveyTakeComponent implements OnInit {
  survey: Survey | null = null;
  surveyForm: FormGroup;
  currentUser: User | null = null;
  isLoading = true;
  isSubmitting = false;
  errorMessage = '';
  hasAlreadyCompleted = false;

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private surveyResponseService: SurveyResponseService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      answers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (!user) {
        this.router.navigate(['/login']);
        return;
      }
    });

    const surveyId = this.route.snapshot.paramMap.get('id');
    if (surveyId) {
      this.loadSurvey(surveyId);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }

  get answers(): FormArray {
    return this.surveyForm.get('answers') as FormArray;
  }

  loadSurvey(id: string): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (survey) => {
        if (!survey) {
          this.router.navigate(['/dashboard']);
          return;
        }

        if (survey.status !== SurveyStatus.OPEN) {
          this.errorMessage = '此调查当前不可参与';
          this.isLoading = false;
          return;
        }

        this.survey = survey;
        
        if (this.currentUser) {
          this.surveyResponseService.hasRespondentCompletedSurvey(id, this.currentUser.id).subscribe({
            next: (hasCompleted) => {
              this.hasAlreadyCompleted = hasCompleted;
              if (hasCompleted) {
                this.errorMessage = '您已经完成过此调查，不能重复参与';
              }
            }
          });
        }

        while (this.answers.length > 0) {
          this.answers.removeAt(0);
        }

        for (const question of survey.questions) {
          this.answers.push(this.fb.group({
            questionId: [question.id],
            optionId: ['', [Validators.required]]
          }));
        }

        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = '加载调查失败，请重试';
      }
    });
  }

  selectOption(questionIndex: number, optionId: string): void {
    const answerGroup = this.answers.at(questionIndex);
    answerGroup.patchValue({ optionId });
  }

  onSubmit(): void {
    if (this.surveyForm.invalid || !this.survey || !this.currentUser) {
      this.markAllAsTouched();
      this.errorMessage = '请回答所有问题后再提交';
      return;
    }

    const unanswered = this.answers.controls.filter((control, index) => {
      const optionId = control.get('optionId')?.value;
      return !optionId;
    });

    if (unanswered.length > 0) {
      this.markAllAsTouched();
      this.errorMessage = `还有 ${unanswered.length} 个问题未回答，请完成所有问题`;
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const formValue = this.surveyForm.value;
    const answers = formValue.answers.map((a: any) => ({
      questionId: a.questionId,
      optionId: a.optionId
    }));

    this.surveyResponseService.submitResponse(this.survey.id, this.currentUser.id, answers).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/surveys/open']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = '提交失败，请重试';
      }
    });
  }

  markAllAsTouched(): void {
    this.surveyForm.markAllAsTouched();
    this.answers.controls.forEach(control => control.markAllAsTouched());
  }

  onCancel(): void {
    this.router.navigate(['/surveys/open']);
  }

  goBack(): void {
    this.router.navigate(['/surveys/open']);
  }
}
