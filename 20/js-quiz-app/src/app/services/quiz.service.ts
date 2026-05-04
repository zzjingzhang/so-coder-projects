import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Question } from '../models/question.model';
import { QuizState } from '../models/quiz-state.model';
import { QUESTIONS, QUIZ_CONFIG } from '../data/quiz-data';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: Question[] = QUESTIONS;
  private quizStateSubject = new BehaviorSubject<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: QUESTIONS.length,
    timeRemaining: QUIZ_CONFIG.totalTime,
    isCompleted: false,
    answers: new Array(QUESTIONS.length).fill(null),
  });

  private timerSubscription: any;

  quizState$: Observable<QuizState> = this.quizStateSubject.asObservable();

  getQuizConfig() {
    return QUIZ_CONFIG;
  }

  getQuestions(): Question[] {
    return this.questions;
  }

  getCurrentQuestion(): Question | null {
    const state = this.quizStateSubject.value;
    if (state.currentQuestionIndex < this.questions.length) {
      return this.questions[state.currentQuestionIndex];
    }
    return null;
  }

  startQuiz(): void {
    this.resetQuiz();
    this.startTimer();
  }

  resetQuiz(): void {
    this.stopTimer();
    this.quizStateSubject.next({
      currentQuestionIndex: 0,
      score: 0,
      totalQuestions: this.questions.length,
      timeRemaining: QUIZ_CONFIG.totalTime,
      isCompleted: false,
      answers: new Array(this.questions.length).fill(null),
    });
  }

  selectAnswer(answerIndex: number): void {
    const state = this.quizStateSubject.value;
    const currentQuestion = this.getCurrentQuestion();

    if (!currentQuestion || state.isCompleted) return;

    const newAnswers = [...state.answers];
    newAnswers[state.currentQuestionIndex] = answerIndex;

    let newScore = state.score;
    const previousAnswer = state.answers[state.currentQuestionIndex];

    if (previousAnswer !== null) {
      if (previousAnswer === currentQuestion.correctAnswer) {
        newScore--;
      }
    }

    if (answerIndex === currentQuestion.correctAnswer) {
      newScore++;
    }

    this.quizStateSubject.next({
      ...state,
      score: newScore,
      answers: newAnswers,
    });
  }

  nextQuestion(): void {
    const state = this.quizStateSubject.value;
    if (state.currentQuestionIndex < this.questions.length - 1) {
      this.quizStateSubject.next({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      });
    } else {
      this.completeQuiz();
    }
  }

  stopQuiz(): void {
    this.completeQuiz();
  }

  private completeQuiz(): void {
    this.stopTimer();
    const state = this.quizStateSubject.value;
    this.quizStateSubject.next({
      ...state,
      isCompleted: true,
    });
  }

  private startTimer(): void {
    this.timerSubscription = interval(1000)
      .pipe(takeWhile(() => !this.quizStateSubject.value.isCompleted))
      .subscribe(() => {
        const state = this.quizStateSubject.value;
        if (state.timeRemaining > 0) {
          this.quizStateSubject.next({
            ...state,
            timeRemaining: state.timeRemaining - 1,
          });
        } else {
          this.completeQuiz();
        }
      });
  }

  private stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  getProgressPercentage(): number {
    const state = this.quizStateSubject.value;
    return ((state.currentQuestionIndex + 1) / this.questions.length) * 100;
  }
}
