import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TournamentFormData, FormValidationErrors } from '../../models/tournament.model';
import { TournamentGeneratorService } from '../../services/tournament-generator.service';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
  ],
  templateUrl: './tournament-form.component.html',
  styleUrls: ['./tournament-form.component.css']
})
export class TournamentFormComponent implements OnInit {
  @Output() formSubmit = new EventEmitter<TournamentFormData>();
  
  tournamentForm!: FormGroup;
  validationErrors: FormValidationErrors = {};
  teamCountOptions: number[] = [2, 4, 8, 16, 32, 64];

  constructor(
    private fb: FormBuilder,
    private tournamentGenerator: TournamentGeneratorService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.tournamentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      teamCount: [8, [Validators.required, Validators.min(2), Validators.max(64)]]
    }, { validators: this.dateRangeValidator });
  }

  private dateRangeValidator(group: FormGroup): ValidationErrors | null {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;
    
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        return { dateRangeInvalid: true };
      }
    }
    
    return null;
  }

  get nameControl(): AbstractControl {
    return this.tournamentForm.get('name')!;
  }

  get startDateControl(): AbstractControl {
    return this.tournamentForm.get('startDate')!;
  }

  get endDateControl(): AbstractControl {
    return this.tournamentForm.get('endDate')!;
  }

  get teamCountControl(): AbstractControl {
    return this.tournamentForm.get('teamCount')!;
  }

  onSubmit(): void {
    this.validationErrors = {};
    
    if (this.tournamentForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const formValue = this.tournamentForm.value;
    
    const teamCount = formValue.teamCount;
    if (teamCount % 2 !== 0) {
      this.validationErrors.teamCount = '参赛队伍数量必须是偶数';
      return;
    }

    if (!this.tournamentGenerator.validateDates(formValue.startDate, formValue.endDate)) {
      this.validationErrors.startDate = '请检查日期格式是否正确';
      this.validationErrors.endDate = '结束日期必须大于等于开始日期';
      return;
    }

    const formData: TournamentFormData = {
      name: formValue.name,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      teamCount: formValue.teamCount
    };

    this.formSubmit.emit(formData);
  }

  private markAllFieldsAsTouched(): void {
    Object.values(this.tournamentForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getTeamCountHint(): string {
    const count = this.teamCountControl.value;
    if (count && !this.tournamentGenerator.isPowerOfTwo(count)) {
      return '提示：队伍数量建议为 2 的幂次方（如 2, 4, 8, 16...），否则将自动设置轮空';
    }
    return '';
  }

  selectTeamCount(count: number): void {
    this.teamCountControl.setValue(count);
  }
}
