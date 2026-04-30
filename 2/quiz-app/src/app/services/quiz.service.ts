import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question, QUESTIONS } from '../data';

export interface QuestionState {
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  showReason: boolean;
  isFavorited: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private questionsSubject = new BehaviorSubject<Question[]>(QUESTIONS);
  questions$ = this.questionsSubject.asObservable();

  private currentIndexSubject = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();

  private questionStatesSubject = new BehaviorSubject<Map<number, QuestionState>>(
    this.initializeStates()
  );
  questionStates$ = this.questionStatesSubject.asObservable();

  private wrongQuestionsSubject = new BehaviorSubject<number[]>([]);
  wrongQuestions$ = this.wrongQuestionsSubject.asObservable();

  private favoriteQuestionsSubject = new BehaviorSubject<number[]>([]);
  favoriteQuestions$ = this.favoriteQuestionsSubject.asObservable();

  private initializeStates(): Map<number, QuestionState> {
    const states = new Map<number, QuestionState>();
    QUESTIONS.forEach(q => {
      states.set(q.id, {
        selectedAnswer: null,
        isCorrect: null,
        showReason: false,
        isFavorited: false
      });
    });
    return states;
  }

  get questions(): Question[] {
    return this.questionsSubject.value;
  }

  get currentIndex(): number {
    return this.currentIndexSubject.value;
  }

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  get questionStates(): Map<number, QuestionState> {
    return this.questionStatesSubject.value;
  }

  get wrongQuestions(): number[] {
    return this.wrongQuestionsSubject.value;
  }

  get favoriteQuestions(): number[] {
    return this.favoriteQuestionsSubject.value;
  }

  get favoriteCount(): number {
    return this.favoriteQuestions.length;
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.currentIndexSubject.next(index);
    }
  }

  goToNextQuestion(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndexSubject.next(this.currentIndex + 1);
    }
  }

  goToPreviousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndexSubject.next(this.currentIndex - 1);
    }
  }

  selectAnswer(questionId: number, answerIndex: number): void {
    const states = new Map(this.questionStates);
    const state = states.get(questionId);
    const question = this.questions.find(q => q.id === questionId);

    if (state && question) {
      const isCorrect = answerIndex === question.answer;
      state.selectedAnswer = answerIndex;
      state.isCorrect = isCorrect;

      const wrongQuestions = [...this.wrongQuestions];
      if (!isCorrect && !wrongQuestions.includes(questionId)) {
        wrongQuestions.push(questionId);
        this.wrongQuestionsSubject.next(wrongQuestions);
      } else if (isCorrect) {
        const index = wrongQuestions.indexOf(questionId);
        if (index > -1) {
          wrongQuestions.splice(index, 1);
          this.wrongQuestionsSubject.next(wrongQuestions);
        }
      }

      states.set(questionId, state);
      this.questionStatesSubject.next(states);
    }
  }

  showReason(questionId: number): void {
    const states = new Map(this.questionStates);
    const state = states.get(questionId);
    if (state) {
      state.showReason = true;
      states.set(questionId, state);
      this.questionStatesSubject.next(states);
    }
  }

  toggleFavorite(questionId: number): void {
    const states = new Map(this.questionStates);
    const state = states.get(questionId);
    const favorites = [...this.favoriteQuestions];

    if (state) {
      state.isFavorited = !state.isFavorited;
      states.set(questionId, state);

      if (state.isFavorited && !favorites.includes(questionId)) {
        favorites.push(questionId);
      } else if (!state.isFavorited) {
        const index = favorites.indexOf(questionId);
        if (index > -1) {
          favorites.splice(index, 1);
        }
      }

      this.questionStatesSubject.next(states);
      this.favoriteQuestionsSubject.next(favorites);
    }
  }

  getQuestionState(questionId: number): QuestionState | undefined {
    return this.questionStates.get(questionId);
  }

  getQuestionIndexById(questionId: number): number {
    return this.questions.findIndex(q => q.id === questionId);
  }

  getQuestionStatus(questionId: number): 'unanswered' | 'correct' | 'wrong' {
    const state = this.getQuestionState(questionId);
    if (!state || state.isCorrect === null) {
      return 'unanswered';
    }
    return state.isCorrect ? 'correct' : 'wrong';
  }
}
