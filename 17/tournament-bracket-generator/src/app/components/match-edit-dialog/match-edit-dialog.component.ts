import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Match, Tournament, Team } from '../../models/tournament.model';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface MatchEditDialogData {
  match: Match;
  tournament: Tournament;
}

@Component({
  selector: 'app-match-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './match-edit-dialog.component.html',
  styleUrls: ['./match-edit-dialog.component.css']
})
export class MatchEditDialogComponent {
  matchForm!: FormGroup;
  match: Match;
  tournament: Tournament;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MatchEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MatchEditDialogData
  ) {
    this.match = data.match;
    this.tournament = data.tournament;
    this.initForm();
  }

  private initForm(): void {
    this.matchForm = this.fb.group({
      team1Name: [this.match.team1?.name || '', [Validators.required, Validators.minLength(1)]],
      team2Name: [this.match.team2?.name || '', [Validators.required, Validators.minLength(1)]],
      matchDate: [this.match.matchDate || ''],
      score1: [this.match.score1, [Validators.min(0)]],
      score2: [this.match.score2, [Validators.min(0)]]
    });
  }

  get team1NameControl() {
    return this.matchForm.get('team1Name')!;
  }

  get team2NameControl() {
    return this.matchForm.get('team2Name')!;
  }

  get matchDateControl() {
    return this.matchForm.get('matchDate')!;
  }

  get score1Control() {
    return this.matchForm.get('score1')!;
  }

  get score2Control() {
    return this.matchForm.get('score2')!;
  }

  canEnterScores(): boolean {
    return this.team1NameControl.value && this.team2NameControl.value;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.matchForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    const formValue = this.matchForm.value;
    
    const updates: Partial<Match> = {
      team1: formValue.team1Name ? { name: formValue.team1Name } : null,
      team2: formValue.team2Name ? { name: formValue.team2Name } : null,
      matchDate: formValue.matchDate || null,
      score1: formValue.score1 !== null && formValue.score1 !== '' ? formValue.score1 : null,
      score2: formValue.score2 !== null && formValue.score2 !== '' ? formValue.score2 : null
    };

    this.dialogRef.close({
      matchId: this.match.id,
      updates: updates
    });
  }

  private markAllFieldsAsTouched(): void {
    Object.values(this.matchForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  getRoundName(): string {
    const totalRounds = this.tournament.rounds;
    const roundFromEnd = totalRounds - this.match.round + 1;
    
    switch (roundFromEnd) {
      case 1:
        return '决赛';
      case 2:
        return '半决赛';
      case 3:
        return '四分之一决赛';
      case 4:
        return '八分之一决赛';
      default:
        return `第 ${this.match.round} 轮`;
    }
  }
}
