import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SurveyService } from '../../services/survey.service';
import { AuthService } from '../../services/auth.service';
import { Question } from '../../models/question.model';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-survey-edit',
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
    MatTooltipModule
  ],
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-edit.component.css']
})
export class SurveyEditComponent implements OnInit {
  surveyForm: FormGroup;
  surveyId: string | null = null;
  isEditMode = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.surveyForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      questions: this.fb.array([], [this.minQuestionsValidator(1), this.maxQuestionsValidator(10)])
    });
  }

  ngOnInit(): void {
    if (!this.authService.isCoordinator()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.surveyId = this.route.snapshot.paramMap.get('id');
    if (this.surveyId) {
      this.isEditMode = true;
      this.loadSurvey(this.surveyId);
    } else {
      this.addQuestion();
    }
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  minQuestionsValidator(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.length >= min ? null : { minQuestions: { required: min, actual: formArray.length } };
    };
  }

  maxQuestionsValidator(max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.length <= max ? null : { maxQuestions: { max: max, actual: formArray.length } };
    };
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(200)]],
      options: this.fb.array([
        this.createOption(),
        this.createOption()
      ], [this.minOptionsValidator(2), this.maxOptionsValidator(5)])
    });
  }

  createOption(): FormGroup {
    return this.fb.group({
      text: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  addQuestion(): void {
    if (this.questions.length < 10) {
      this.questions.push(this.createQuestion());
    }
  }

  removeQuestion(index: number): void {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options.length < 5) {
      options.push(this.createOption());
    }
  }

  removeOption(questionIndex: number, optionIndex: number): void {
    const options = this.getOptions(questionIndex);
    if (options.length > 2) {
      options.removeAt(optionIndex);
    }
  }

  minOptionsValidator(min: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.length >= min ? null : { minOptions: { required: min, actual: formArray.length } };
    };
  }

  maxOptionsValidator(max: number) {
    return (control: AbstractControl): ValidationErrors | null => {
      const formArray = control as FormArray;
      return formArray.length <= max ? null : { maxOptions: { max: max, actual: formArray.length } };
    };
  }

  loadSurvey(id: string): void {
    this.surveyService.getSurveyById(id).subscribe({
      next: (survey) => {
        if (survey) {
          this.surveyForm.patchValue({ title: survey.title });
          
          while (this.questions.length > 0) {
            this.questions.removeAt(0);
          }
          
          for (const question of survey.questions) {
            const questionGroup = this.fb.group({
              text: [question.text, [Validators.required, Validators.maxLength(200)]],
              options: this.fb.array([])
            });
            
            const optionsArray = questionGroup.get('options') as FormArray;
            for (const option of question.options) {
              optionsArray.push(this.fb.group({
                text: [option.text, [Validators.required, Validators.maxLength(100)]]
              }));
            }
            
            this.questions.push(questionGroup);
          }
        }
      }
    });
  }

  onSubmit(): void {
    if (this.surveyForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValue = this.surveyForm.value;
    const questions: Question[] = formValue.questions.map((q: any, index: number) => ({
      id: this.isEditMode ? `q_${index}` : `q_${Date.now()}_${index}`,
      text: q.text,
      options: q.options.map((o: any, optIndex: number) => ({
        id: this.isEditMode ? `opt_${index}_${optIndex}` : `opt_${Date.now()}_${index}_${optIndex}`,
        text: o.text
      }))
    }));

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = '请先登录';
      this.isLoading = false;
      return;
    }

    if (this.isEditMode && this.surveyId) {
      this.surveyService.updateSurvey(this.surveyId, formValue.title, questions).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = '保存失败，请重试';
        }
      });
    } else {
      this.surveyService.createSurvey(formValue.title, questions, currentUser.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = '创建失败，请重试';
        }
      });
    }
  }

  markAllAsTouched(): void {
    this.surveyForm.markAllAsTouched();
    this.questions.controls.forEach(q => {
      q.markAllAsTouched();
      const options = q.get('options') as FormArray;
      options.controls.forEach(o => o.markAllAsTouched());
    });
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
