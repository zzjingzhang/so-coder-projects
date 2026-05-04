import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Survey, SurveyStatus } from '../models/survey.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private readonly STORAGE_KEY = 'survey_app_surveys';
  
  private surveysSubject = new BehaviorSubject<Survey[]>([]);
  public surveys$ = this.surveysSubject.asObservable();

  constructor() {
    this.loadSurveys();
  }

  private loadSurveys(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const surveys = JSON.parse(stored).map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt)
      }));
      this.surveysSubject.next(surveys);
    }
  }

  private saveSurveysToStorage(surveys: Survey[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(surveys));
    this.surveysSubject.next(surveys);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  getSurveys(): Observable<Survey[]> {
    return this.surveys$;
  }

  getSurveyById(id: string): Observable<Survey | undefined> {
    const survey = this.surveysSubject.value.find(s => s.id === id);
    return of(survey);
  }

  getSurveysByStatus(status: SurveyStatus): Observable<Survey[]> {
    const surveys = this.surveysSubject.value.filter(s => s.status === status);
    return of(surveys);
  }

  createSurvey(title: string, questions: Question[], createdBy: string): Observable<Survey> {
    const now = new Date();
    const newSurvey: Survey = {
      id: this.generateId(),
      title,
      questions,
      status: SurveyStatus.DRAFT,
      createdBy,
      createdAt: now,
      updatedAt: now
    };
    
    const surveys = [...this.surveysSubject.value, newSurvey];
    this.saveSurveysToStorage(surveys);
    
    return of(newSurvey);
  }

  updateSurvey(surveyId: string, title: string, questions: Question[]): Observable<Survey | null> {
    const surveys = [...this.surveysSubject.value];
    const index = surveys.findIndex(s => s.id === surveyId);
    
    if (index === -1) {
      return of(null);
    }
    
    surveys[index] = {
      ...surveys[index],
      title,
      questions,
      updatedAt: new Date()
    };
    
    this.saveSurveysToStorage(surveys);
    return of(surveys[index]);
  }

  openSurvey(surveyId: string): Observable<Survey | null> {
    return this.updateSurveyStatus(surveyId, SurveyStatus.OPEN);
  }

  closeSurvey(surveyId: string): Observable<Survey | null> {
    return this.updateSurveyStatus(surveyId, SurveyStatus.CLOSED);
  }

  private updateSurveyStatus(surveyId: string, status: SurveyStatus): Observable<Survey | null> {
    const surveys = [...this.surveysSubject.value];
    const index = surveys.findIndex(s => s.id === surveyId);
    
    if (index === -1) {
      return of(null);
    }
    
    surveys[index] = {
      ...surveys[index],
      status,
      updatedAt: new Date()
    };
    
    this.saveSurveysToStorage(surveys);
    return of(surveys[index]);
  }

  deleteSurvey(surveyId: string): Observable<boolean> {
    const surveys = this.surveysSubject.value.filter(s => s.id !== surveyId);
    this.saveSurveysToStorage(surveys);
    return of(true);
  }
}
